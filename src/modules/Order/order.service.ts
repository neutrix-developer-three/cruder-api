import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { Order } from './schema/order.schema';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDetails } from './schema/order-details.schema';
import { BillingAddress } from './schema/billing-address.schema';
import { ShippingAddress } from './schema/shipping-address.schema';
import { CouponLog } from './schema/coupon-log.schema';
import { Coupon } from '../Coupon/schema/coupon.schema';
import { CouponRepository } from '../Coupon/coupon.repository';
import { AuthorizePaymentConfigCms } from '../CMS/SiteSetting/authorize-payment-config-cms/schema/authorize-payment-config-cms.schema';
import { AuthorizePaymentConfigCmsRepository } from '../CMS/SiteSetting/authorize-payment-config-cms/authorize-payment-config-cms-repository';
import { SalesTaxCms } from '../CMS/SiteSetting/sales-tax/schema/sales-tax-cms.schema';
import { SalesTaxCmsRepository } from '../CMS/SiteSetting/sales-tax/sales-tax-cms-repository';
import { OrderDetailsRepository } from './order-details.repository';
import { BillingAddressRepository } from './billing-address.repository';
import { ShippingAddressRepository } from './shipping-address.repository';
import { CouponLogRepository } from './coupon-log.repository';
import { PlaceOrderDto } from './dto/place-order.dto';
import { InvoicePayment } from './schema/invoice-payment.schema';
import { InvoicePaymentRepository } from './invoice-payment.repository';
import { InvoicePaymentPayloadInterface } from './invoice-payment-payload.interface';
import { CreateInvoicePaymentDto } from './dto/create-invoice-payment.dto';
import { getCurrentDateTime } from 'src/utils/dates.utils';
import { CreateOrderDetailsDto } from './dto/create-order-details.dto';
import { CreateBillingAddressDto } from './dto/create-billing-address.dto';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { CreateCouponLogDto } from './dto/create-coupon-log.dto';
import { UpdateCouponDto } from '../Coupon/dto/update-coupon.dto';
import { MailSenderService } from '../mail-sender/mail-sender.service';
import { CreateOrderMailSenderDto } from '../mail-sender/dto/create-order-mail-sender.dto';
import { PaymentService } from '../PaymentModule/payment.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly servMail: MailSenderService,
    private readonly paymentService: PaymentService,
    @InjectModel('order_infos') private readonly orderModel: Model<Order>,
    @InjectModel('order_details') private readonly orderDetailsModel: Model<OrderDetails>,
    @InjectModel('billing_addresses') private readonly billingAddressModel: Model<BillingAddress>,
    @InjectModel('shipping_addresses') private readonly shippingAddressModel: Model<ShippingAddress>,
    @InjectModel('coupon_log') private readonly couponLogModel: Model<CouponLog>,
    @InjectModel('coupons') private readonly couponModel: Model<Coupon>,
    @InjectModel('authorize_payment_configs')
        private readonly authorizeConfigCmsModel: Model<AuthorizePaymentConfigCms>,
    @InjectModel('sales_taxes')
        private readonly salesTaxCmsModel: Model<SalesTaxCms>,
        @InjectModel('invoice_payments')
        private readonly invoicePaymentModel: Model<InvoicePayment>
  ) {}

  private readonly orderRepository = new OrderRepository(this.orderModel);
  private readonly orderDetailsRepository = new OrderDetailsRepository(this.orderDetailsModel);
  private readonly billingAddressRepository = new BillingAddressRepository(this.billingAddressModel);
  private readonly shippingAddressRepository = new ShippingAddressRepository(this.shippingAddressModel);
  private readonly couponLogRepository = new CouponLogRepository(this.couponLogModel);
  private readonly couponRepository = new CouponRepository(this.couponModel);
  private readonly authorizePaymentConfigCmsRepository = new AuthorizePaymentConfigCmsRepository(
    this.authorizeConfigCmsModel
  );
  private readonly salesTaxCmsRepository = new SalesTaxCmsRepository(
    this.salesTaxCmsModel
  );
  private readonly invoicePaymentRepository = new InvoicePaymentRepository(
    this.invoicePaymentModel
  );

  async create(dto: PlaceOrderDto, user:any): Promise<Order> {
    try{
      const authorizePaymentConfigCms = await this.authorizePaymentConfigCmsRepository.findOneEntity();
      if(!authorizePaymentConfigCms){
        throw new BadRequestException('Failed, Payment account not configured yet.');
      }
      if(dto.cartInfo?.length==0){
        throw new BadRequestException('Cart data should not be empty');
      }
      const guest_id='9999999999999';
      const guest_name='Guest';
      let customerId='';
      let customerName='';
      const ct = dto.ct;
      let orderMail = '';
      if(ct==='normal'){
        if(!user){
          throw new ForbiddenException('Forbidden resource');
        }
        customerId=user?._id;
        customerName=user?.fullName;
        dto.user=user;
        orderMail=user?.email;
      }else{
        dto.user=null;
        customerId=guest_id;
        let guestCustomerName=dto.bname;
        if(dto.blastname) guestCustomerName=guestCustomerName+' '+dto.blastname;
        customerName=guestCustomerName;
        orderMail=dto?.semail;
      }
      const salesTaxCms = await this.salesTaxCmsRepository.findOneEntity();
      let tax_rate = (salesTaxCms)?salesTaxCms.dis_amount:0;
      let totalAmount = 0; let totalQuantity=0;
      for (const cart of dto.cartInfo){
        totalAmount += cart.total_discount_with_price;
        totalQuantity += cart.quantity;
      }
      let orderID = 'chill-1000';
      const orderInfo = await this.orderRepository.findLastEntity();
      if(orderInfo){
        const parseOrderId = orderInfo?.orderId?.split('-');
        const orderIdIncrement= parseInt(parseOrderId[1])+1;
        orderID = `chill-${orderIdIncrement}`;
      }
      const invoiceNumber = orderID;
      const shipping_method_price = (dto.shipping_method_price) ? parseFloat(dto.shipping_method_price.toFixed(2)) : 0;
      const sales_tax = (dto.sales_tax) ? parseFloat(dto.sales_tax.toFixed(2)) : 0;
      const couponAmt = (dto.couponAmt) ? parseFloat(dto.couponAmt.toFixed(2)) : 0;
      const payableAmount = ((totalAmount+shipping_method_price+sales_tax)-couponAmt);
      const getPayableAmount = parseFloat(payableAmount.toFixed(2));
      const paymentRes = await this.paymentService.makeAuthorizeTransaction(dto,authorizePaymentConfigCms,getPayableAmount,invoiceNumber);
      console.log('paymentRes paymentRes ', paymentRes);
      if(paymentRes?.responseCode!==100){
        throw new BadRequestException(paymentRes.responseText);
      }
      //console.log('----paymentRes----', paymentRes);
      const  paymentStatus='Paid';
      const paymentPayload : InvoicePaymentPayloadInterface={
        cardPayload:{
          cardHolderName: dto.cardHolderName,
          cardnumber: dto.cardnumber,
          expirationdate: dto.expirationdate,
          securitycode: dto.securitycode,
        },
        resCardProcess:paymentRes?.transRes
      };
      
    const currentData = getCurrentDateTime();
      const invoicePaymentData = {
        invoiceId: orderID,
        customerId: customerId,
        customerName: customerName,
        paymentAmount: getPayableAmount,
        paymentDate: getCurrentDateTime(),
        paymentPayload:paymentPayload,
        paymentTransID: paymentRes.transactionId,
        ct:ct
      } as CreateInvoicePaymentDto; 
    
      const invoiceCreate = await this.invoicePaymentRepository.createEntity(invoicePaymentData);
      if (!invoiceCreate) {
        throw new BadRequestException(
          Constants.CREATE_FAILED,
        );
      }
      // order info data
      const orderInfoData = {
        orderId:orderID,
        customerId: customerId,
        user:dto.user,
        customerName: customerName,
        totalQuantity:totalQuantity,
        totalAmount:getPayableAmount,
        totalDiscountAmount:couponAmt,
        paymentMethodId:1,
        paymentMethodName:'Card Payment',
        shippingMethodId:dto.shipping_method,
        shippingMethodName:dto.shipping_method,
        shippingMethodPrice:shipping_method_price,
        paymentStatus:paymentStatus,
        sales_tax:sales_tax,
        remarks:dto.remarks,
        status:'Pending',
        isFreeShipping:dto.isShipping,
        coupon_amount:couponAmt,
        couponCode:dto?.couponCode,
        ct:ct

      } as CreateOrderDto; 
      const orderCreate = await this.orderRepository.createEntity(orderInfoData);
      if (!orderCreate) {
        throw new BadRequestException(
          Constants.CREATE_FAILED,
        );
      }
      // order details data
      for (const cart of dto.cartInfo){
        const orderDetailsData = {
          orderId:orderID,
          customerId: customerId,
          customerName: customerName,
          productId:cart.productId,
          productName:cart.name,
          productImage:cart.image,
          quantity:cart.quantity,
          price:cart.price,
          discountAmount:parseFloat(cart?.discount_amount.toFixed(2)),
          discountWithPrice:parseFloat(cart?.discount_with_price.toFixed(2)),
          totalDiscountWithPrice:parseFloat(cart?.total_discount_with_price.toFixed(2)),
          totalAmount:parseFloat(cart?.total_amount.toFixed(2)),
          tax_rate:tax_rate,
          ct:ct
        } as CreateOrderDetailsDto;
        await this.orderDetailsRepository.createEntity(orderDetailsData);
      }

      // billing address
      const billingData = {
        orderId:orderID,
        customerId: customerId,
        customerName: customerName,
        name:dto.bname,
        last_name:dto.blastname,
        mobile:dto.bmobile,
        email:dto.bemail,
        country:dto.bcountry,
        city:dto.bcity,
        postCode:dto.bpostCode,
        address:dto.baddress
      } as CreateBillingAddressDto;

      await this.billingAddressRepository.createEntity(billingData);

      // shipping address
      const shippingData = {
        orderId:orderID,
        customerId: customerId,
        customerName: customerName,
        name:dto.sname,
        last_name:dto.slastname,
        mobile:dto.smobile,
        email:dto.semail,
        country:dto.scountry,
        city:dto.scity,
        postCode:dto.spostCode,
        address:dto.saddress
      } as CreateShippingAddressDto;

      await this.shippingAddressRepository.createEntity(shippingData);

      if(dto?.couponCode && couponAmt>0){
        // coupon log 
        const couponLogData = {
          user_id:customerId,
          user_name:customerName,
          order_id:orderID
        } as CreateCouponLogDto;

        await this.couponLogRepository.createEntity(couponLogData);
        // coupon use increment
        const checkCoupon = await this.couponRepository.findOneByFilterQuery({couponCode:dto.couponCode});
        if(checkCoupon){
          const cuponUsedTotal = checkCoupon.cuponUsedTotal;
          const couponData = {
            cuponUsedTotal:cuponUsedTotal+1
          } as UpdateCouponDto
          await this.couponRepository.updateEntity(checkCoupon._id.toString(), couponData);
        }
        
      }

      // order mail 
      let mailDto = {
        to: orderMail,
        from: process.env.EMAIL_SENDER_MAIL,
        subject: "Your order is submitted successfully",
        orderId:orderID
      } as CreateOrderMailSenderDto
      
      const mailRes = await this.servMail.sendOrderMail(mailDto);
      //console.log('mailRes :', mailRes)
      return ResponseUtils.successResponseHandler(
        201,
        'Order Placed Successfully!',
        'data',
        orderCreate,
      );
    }catch (e) {
      //return e?.response;
      console.log('error ', e?.response);
      if(e?.response?.statusCode===400){
        throw new BadRequestException( e.response?.message);
      }else if(e?.response?.message){
        throw new InternalServerErrorException(e.response?.message);
      }else{
        throw new InternalServerErrorException('Internal server error');
      }
      
    }
  }


  async findOrderInfo(orderId:string): Promise<any> {
    const orderInfo  = await this.orderRepository.findOneByFilterQuery({orderId:orderId});
    const orderDetailsInfo  = await this.orderDetailsRepository.findAllByFilterQuery({orderId:orderId});
    const invoicePaymentInfo = await this.invoicePaymentRepository.findOneByFilterQuery({invoiceId:orderId});
    const billingInfo = await this.billingAddressRepository.findOneByFilterQuery({orderId:orderId});
    const shippingInfo = await this.shippingAddressRepository.findOneByFilterQuery({orderId:orderId});
    const data ={orderInfo,orderDetailsInfo,invoicePaymentInfo,billingInfo,shippingInfo};
    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }
  
}
