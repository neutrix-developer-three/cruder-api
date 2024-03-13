import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Order } from '../Order/schema/order.schema';
import { OrderRepository } from '../Order/order.repository';
import { SiteSettingsCms } from '../CMS/SiteSetting/site-settings-cms/schema/site-settings-cms.schema';
import { SiteSettingsCmsRepository } from '../CMS/SiteSetting/site-settings-cms/site-settings-cms-repository';
import { OrderDetails } from '../Order/schema/order-details.schema';
import { BillingAddress } from '../Order/schema/billing-address.schema';
import { ShippingAddress } from '../Order/schema/shipping-address.schema';
import { InvoicePayment } from '../Order/schema/invoice-payment.schema';
import { OrderDetailsRepository } from '../Order/order-details.repository';
import { BillingAddressRepository } from '../Order/billing-address.repository';
import { ShippingAddressRepository } from '../Order/shipping-address.repository';
import { InvoicePaymentRepository } from '../Order/invoice-payment.repository';
import { Users } from '../CRUD/users/schema/users.schema';
import { UsersRepository } from '../CRUD/users/users.repository';
import { formatDate, getCurrentDate, getCurrentDateTime } from 'src/utils/dates.utils';
import { FilterDto } from 'src/core/filter.dto';
import { UpdateOrderDto } from '../Order/dto/update-order.dto';
import { AuthPaymentConfig, Constants } from 'src/utils/constants';
import { CreateAdminOrderDto } from './dto/create-admin-order.dto';
import { AuthorizePaymentConfigCms } from '../CMS/SiteSetting/authorize-payment-config-cms/schema/authorize-payment-config-cms.schema';
import { AuthorizePaymentConfigCmsRepository } from '../CMS/SiteSetting/authorize-payment-config-cms/authorize-payment-config-cms-repository';
import { SalesTaxCms } from '../CMS/SiteSetting/sales-tax/schema/sales-tax-cms.schema';
import { SalesTaxCmsRepository } from '../CMS/SiteSetting/sales-tax/sales-tax-cms-repository';
import {
  APIContracts,
  APIControllers,
  Constants as SDKConstants,
} from 'authorizenet';
import { InvoicePaymentPayloadInterface } from '../Order/invoice-payment-payload.interface';
import { CreateInvoicePaymentDto } from '../Order/dto/create-invoice-payment.dto';
import { CreateOrderDto } from '../Order/dto/create-order.dto';
import { CreateOrderDetailsDto } from '../Order/dto/create-order-details.dto';
import { CreateBillingAddressDto } from '../Order/dto/create-billing-address.dto';
import { CreateShippingAddressDto } from '../Order/dto/create-shipping-address.dto';
import { CreateUsersDto } from '../CRUD/users/dto/create-users.dto';
import { RegisterAuthDto } from '../auth/dto/register-auth.dto';
import { Product } from '../Product/product/schema/product.schema';
import { ProductRepository } from '../Product/product/product.repository';
import { InvoiceRefundDto } from './dto/invoice-refund.dto';
import { PaymentService } from '../PaymentModule/payment.service';
import { generateRandomNumber } from 'src/utils/common-helper';
import { LogActivityService } from '../LogActivity/log-activity.service';

@Injectable()
export class AdminOrderService {
  constructor(
    private readonly paymentService: PaymentService,
    @InjectModel('order_infos') private readonly orderModel: Model<Order>,
    @InjectModel('order_details') private readonly orderDetailsModel: Model<OrderDetails>,
    @InjectModel('billing_addresses') private readonly billingAddressModel: Model<BillingAddress>,
    @InjectModel('shipping_addresses') private readonly shippingAddressModel: Model<ShippingAddress>,
    @InjectModel('invoice_payments')
    private readonly invoicePaymentModel: Model<InvoicePayment>,
    @InjectModel('Users') private readonly usersModel: Model<Users>,
    @InjectModel('site_settings_cms')
    private readonly siteSettingsCmsModel: Model<SiteSettingsCms>,
    @InjectModel('authorize_payment_configs')
    private readonly authorizeConfigCmsModel: Model<AuthorizePaymentConfigCms>,
    @InjectModel('sales_taxes')
    private readonly salesTaxCmsModel: Model<SalesTaxCms>,
    @InjectModel('products') private readonly productModel: Model<Product>,
    private readonly logService: LogActivityService,
  ) {}

private readonly orderRepository = new OrderRepository(this.orderModel);
private readonly orderDetailsRepository = new OrderDetailsRepository(this.orderDetailsModel);
private readonly billingAddressRepository = new BillingAddressRepository(this.billingAddressModel);
private readonly shippingAddressRepository = new ShippingAddressRepository(this.shippingAddressModel);
private readonly invoicePaymentRepository = new InvoicePaymentRepository(
  this.invoicePaymentModel
);
private readonly usersRepository = new UsersRepository(this.usersModel);
private readonly siteSettingsCmsRepository = new SiteSettingsCmsRepository(
  this.siteSettingsCmsModel
);
private readonly authorizePaymentConfigCmsRepository = new AuthorizePaymentConfigCmsRepository(
  this.authorizeConfigCmsModel
);

private readonly salesTaxCmsRepository = new SalesTaxCmsRepository(
  this.salesTaxCmsModel
);
private readonly productRepository = new ProductRepository(this.productModel);


  
  async findAll(filterDto:FilterDto): Promise<Order | Error> {
    const data =
      await this.orderRepository.paginate(filterDto);
    
    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async formData(): Promise<any | Error> {
    const [user, products,salesTax] = await Promise.all([
      this.usersRepository.findAll(),
      this.productRepository.findAll(),
      this.salesTaxCmsRepository.findOneEntity()
    ]);
    const data ={user,products,salesTax};
    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async findAdminOrderDetails(orderId:string): Promise<any | Error> {
    const order =
      await this.orderRepository.findOnePopulateQuery({orderId:orderId});  
    if(!order){
      throw new NotFoundException('Invalid Order Tracking ID');
    }
    const [orderDetailsInfo,invoicePaymentInfo,billingInfo,shippingInfo,siteSetting]
    = await Promise.all([
      this.orderDetailsRepository.getOrdersWithReturn({orderId:orderId}),
      this.invoicePaymentRepository.findOneByFilterQuery({invoiceId:orderId}),
      this.billingAddressRepository.findOneByFilterQuery({orderId:orderId}),
      this.shippingAddressRepository.findOneByFilterQuery({orderId:orderId}),
      this.siteSettingsCmsRepository.findOneEntity()
    ]);
    
    const data = {
      order,
      orderDetailsInfo,
      invoicePaymentInfo,
      billingInfo,
      shippingInfo,
      siteSetting
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async create(dto: CreateAdminOrderDto): Promise<Order> {
    try{
      const authorizePaymentConfigCms = await this.authorizePaymentConfigCmsRepository.findOneEntity();
      if(!authorizePaymentConfigCms){
        throw new BadRequestException('Failed, Payment account not configured yet.');
      }
      if(dto.cartInfo?.length==0){
        throw new BadRequestException('Cart data should not be empty');
      }
      let customerId=null;
      let customerName=null;
      let userFirstName=null;
      let userLastName=null;
      let billShipName=null;
      let billShipLastName=null;
      if(dto.fullName){
        const splitBillShipName = dto?.fullName.split(' ');
        billShipName=splitBillShipName[0];
        if(splitBillShipName.length>1){
          const fullName  = dto.fullName;
          billShipLastName =  fullName.substring(billShipName.length+1);
        }
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
      const discountAmt = (dto.discountAmt) ? parseFloat(dto.discountAmt.toFixed(2)) : 0;
      const payableAmount = ((totalAmount+shipping_method_price+sales_tax)-discountAmt);
      const getPayableAmount = parseFloat(payableAmount.toFixed(2));
      console.log('getPayableAmount ', getPayableAmount);
      const paymentRes = await this.makeAuthorizeTransaction(dto,authorizePaymentConfigCms,getPayableAmount,invoiceNumber);
      if(paymentRes?.responseCode!==100){
        throw new BadRequestException(paymentRes.responseText);
      }
      // user 
      const checkUser = await this.usersRepository.findOneUserByFilterQuery({email:dto.cusEmail});
      if(checkUser){
        customerId=checkUser._id.toString();
        customerName=checkUser.fullName;
        dto.user=checkUser;
      }else{
        if(dto.cusName){
          const splitCustomerName = dto?.cusName.split(' ');
          userFirstName=splitCustomerName[0];
          if(splitCustomerName.length>1){
            const cusName  = dto.cusName;
            userLastName =  cusName.substring(userFirstName.length+1);
          }
        }
        const userData = {
          password:'asd123',
          email:dto.cusEmail,
          fullName:dto.cusName,
          firstName:userFirstName,
          lastName:userLastName,
          userType:'customer'
        } as  CreateUsersDto;
        const userInsert = await this.usersRepository.createEntity(userData);
        console.log('userInsert ', userInsert);
        customerId=userInsert?._id.toString();
        customerName=dto.cusName;
        dto.user=userInsert;
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
        customerName: dto.cusName,
        totalQuantity:totalQuantity,
        totalAmount:getPayableAmount,
        totalDiscountAmount:discountAmt,
        paymentMethodId:1,
        paymentMethodName:'Card Payment',
        shippingMethodId:dto.shipping_method,
        shippingMethodName:dto.shipping_method,
        shippingMethodPrice:shipping_method_price,
        paymentStatus:paymentStatus,
        sales_tax:sales_tax,
        remarks:dto.remarks,
        status:'Pending',
        coupon_amount:discountAmt,
        isManual:'Yes'

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
          discountAmount:(cart?.discount_amount>0) ? parseFloat(cart?.discount_amount.toFixed(2)) : 0,
          discountWithPrice:(cart?.discount_with_price>0) ? parseFloat(cart?.discount_with_price.toFixed(2)) : 0,
          totalDiscountWithPrice:(cart.total_discount_with_price>0) ? parseFloat(cart?.total_discount_with_price.toFixed(2)) : 0,
          totalAmount:(cart.total_amount>0) ? parseFloat(cart?.total_amount.toFixed(2)) : 0,
          tax_rate:tax_rate
        } as CreateOrderDetailsDto;
        await this.orderDetailsRepository.createEntity(orderDetailsData);
      }

      // billing address
      const billingData = {
        orderId:orderID,
        customerId: customerId,
        customerName: customerName,
        name:billShipName,
        last_name:billShipLastName,
        mobile:dto.phone,
        email:dto.email,
        country:dto.country,
        city:dto.city,
        postCode:dto.postCode,
        address:dto.address
      } as CreateBillingAddressDto;

      await this.billingAddressRepository.createEntity(billingData);

      // shipping address
      const shippingData = {
        orderId:orderID,
        customerId: customerId,
        customerName: customerName,
        name:billShipName,
        last_name:billShipLastName,
        mobile:dto.phone,
        email:dto.email,
        country:dto.country,
        city:dto.city,
        postCode:dto.postCode,
        address:dto.address
      } as CreateShippingAddressDto;

      await this.shippingAddressRepository.createEntity(shippingData);
      await this.logService.createLog('Order data added.');

      return ResponseUtils.successResponseHandler(
        201,
        'Successfully created data.',
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

  async makeAuthorizeTransaction(dto: CreateAdminOrderDto, authorizePaymentConfigCms,totalAmount,invoiceNumber): Promise<any> {
    const res = {
      responseText: 'fail',
      type: 'sale',
      responseCode: 101,
      transactionId: '',
      transRes: {},
    };
    const randomNumber = generateRandomNumber(5);
    const newInvoiceNo = invoiceNumber+'-'+randomNumber;
    const apiLoginKey = authorizePaymentConfigCms?.api_login_id;
    const transactionKey = authorizePaymentConfigCms?.transaction_key;
    const account_status = authorizePaymentConfigCms?.account_status;
    const merchantAuthenticationType =
      new APIContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(apiLoginKey);
    merchantAuthenticationType.setTransactionKey(
      transactionKey,
    );
    let expiryMonthYear=dto.expirationdate;
    if(dto.expirationdate?.length==5){
      const dataYM = dto.expirationdate?.split('/');
      expiryMonthYear = `20${dataYM[1]}-${dataYM[0]}`;
    }
    const creditCard = new APIContracts.CreditCardType();
    creditCard.setCardNumber(dto.cardnumber);
    creditCard.setExpirationDate(expiryMonthYear);
    creditCard.setCardCode(dto.securitycode);
    // creditCard.setCardNumber('4242424242424242');
    // creditCard.setExpirationDate('2026-11');
    // creditCard.setCardCode('111');

    const paymentType = new APIContracts.PaymentType();
    paymentType.setCreditCard(creditCard);
    const orderDetails = new APIContracts.OrderType();
    orderDetails.setInvoiceNumber(newInvoiceNo);
    orderDetails.setDescription('Product Description');

    const transactionRequestType = new APIContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(
      APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION,
    );
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(totalAmount);
    transactionRequestType.setOrder(orderDetails);

    const createRequest = new APIContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    const ctrl = new APIControllers.CreateTransactionController(
      createRequest.getJSON(),
    );
    if(account_status==='PRODUCTION'){
      ctrl.setEnvironment(SDKConstants.endpoint.production);
    }

    try {
      const apiResponse = await new Promise((resolve, reject) => {
        ctrl.execute(function () {
          const apiResponse = ctrl.getResponse();
          const response = new APIContracts.CreateTransactionResponse(
            apiResponse,
          );

          //pretty print response
          //console.log('api response : ', JSON.stringify(response, null, 2));

          if (response != null) {
            if (
              response.getMessages().getResultCode() ==
              APIContracts.MessageTypeEnum.OK
            ) {
              if (response.getTransactionResponse().getMessages() != null) {
                res.transactionId = response
                  ?.getTransactionResponse()
                  ?.getTransId();
                res.responseCode = 100;
                console.log(
                  'Successfully created transaction with Transaction ID: ' +
                    response.getTransactionResponse().getTransId(),
                );
                const transRes = {
                  responseCode: response
                    ?.getTransactionResponse()
                    ?.getResponseCode(),
                  messageCode: response
                    ?.getTransactionResponse()
                    ?.getMessages()
                    ?.getMessage()[0]
                    ?.getCode(),
                  description: response
                    ?.getTransactionResponse()
                    ?.getMessages()
                    ?.getMessage()[0]
                    ?.getDescription(),
                };
                res.transRes = transRes;
                console.log(
                  'Response Code: ' +
                    response.getTransactionResponse().getResponseCode(),
                );
                console.log(
                  'Message Code: ' +
                    response
                      .getTransactionResponse()
                      .getMessages()
                      .getMessage()[0]
                      .getCode(),
                );
                console.log(
                  'Description: ' +
                    response
                      .getTransactionResponse()
                      .getMessages()
                      .getMessage()[0]
                      .getDescription(),
                );
                resolve(res);
              } else {
                console.log('Failed Transaction.');
                if (response.getTransactionResponse().getErrors() != null) {
                  console.log(
                    'Error Code: ' +
                      response
                        .getTransactionResponse()
                        .getErrors()
                        .getError()[0]
                        .getErrorCode(),
                  );
                  console.log(
                    'Error message: ' +
                      response
                        .getTransactionResponse()
                        .getErrors()
                        .getError()[0]
                        .getErrorText(),
                  );
                  res.responseText = response?.getTransactionResponse()?.getErrors()?.getError()[0]?.getErrorText();
              
                }
                reject(res);
              }
            } else {
              console.log('Failed Transaction. ');
              if (
                response.getTransactionResponse() != null &&
                response.getTransactionResponse().getErrors() != null
              ) {
                console.log(
                  'Error Code: ' +
                    response
                      .getTransactionResponse()
                      .getErrors()
                      .getError()[0]
                      .getErrorCode(),
                );
                console.log(
                  'Error message: ' +
                    response
                      .getTransactionResponse()
                      .getErrors()
                      .getError()[0]
                      .getErrorText(),
                );
                  res.responseText = response?.getTransactionResponse()?.getErrors()?.getError()[0]?.getErrorText();            
              } else {
                console.log(
                  'Error Code: ' +
                    response.getMessages().getMessage()[0].getCode(),
                );
                console.log(
                  'Error message: ' +
                    response.getMessages().getMessage()[0].getText(),
                );
                res.responseText = response?.getMessages()?.getMessage()[0]?.getText();
              }
              reject(res);
            }
          } else {
            reject(res);
          }
        });
      });
      return apiResponse;
    } catch (error) {
      // Handle errors here
      console.error('Error:', error.message);
      return res;
    }
  }


  async updateOrderStatus(
    id: string,
    dto: UpdateOrderDto
  ): Promise<Order | null> {
    const res = await this.orderRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }
    const updateData = {status:dto.status} as UpdateOrderDto;
    const data = await this.orderRepository.updateEntity(id, updateData);
    if (!data) {
      throw new BadRequestException(Constants.UPDATE_FAILED);
    }
    await this.logService.createLog('Order status updated.');
    return ResponseUtils.successResponseHandler(
      200,
      'Order status updated successfully',
      'data',
      data,
    );
  }

  async updateOrderPaymentStatus(
    id: string,
    dto: UpdateOrderDto
  ): Promise<Order | null> {
    const res = await this.orderRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }
    const updateData = {paymentStatus:dto.paymentStatus} as UpdateOrderDto;
    const data = await this.orderRepository.updateEntity(id, updateData);
    await this.logService.createLog('Order payment status updated.');
    if (!data) {
      throw new BadRequestException(Constants.UPDATE_FAILED);
    }
    return ResponseUtils.successResponseHandler(
      200,
      'Payment status updated successfully',
      'data',
      data,
    );
  }

  async updateOrderDeliveryStatus(
    id: string,
    dto: UpdateOrderDto
  ): Promise<Order | null> {
    const res = await this.orderRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }
    const updateData = {deliveryStatus:dto.deliveryStatus} as UpdateOrderDto;
    const data = await this.orderRepository.updateEntity(id, updateData);
    await this.logService.createLog('Order delivery status updated.');
    if (!data) {
      throw new BadRequestException(Constants.UPDATE_FAILED);
    }
    return ResponseUtils.successResponseHandler(
      200,
      'Delivery status updated successfully',
      'data',
      data,
    );
  }

  async updateOrderTrackingNumber(
    dto: UpdateOrderDto
  ): Promise<Order | null> {
    const orderId = dto?.orderId;
    const trackingNumber = dto?.trackingNumber;
    const res = await this.orderRepository.findOneByFilterQuery({orderId:orderId});
    if (!res) {
      throw new NotFoundException('Order not found');
    }
    const updateData = {trackingNumber:trackingNumber} as UpdateOrderDto;
    const data = await this.orderRepository.updateEntityByFilter({orderId:orderId}, updateData);
    await this.logService.createLog('Order tracking number updated.');
    if (!data) {
      throw new BadRequestException(Constants.UPDATE_FAILED);
    }
    return ResponseUtils.successResponseHandler(
      200,
      'Order tracking number updated successfully',
      'data',
      data,
    );
  }

  async findAllInvoice(filterDto:FilterDto): Promise<InvoicePayment | Error> {
    const data =
      await this.invoicePaymentRepository.paginate(filterDto);
    
    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async refundInvoicePayment(dto:InvoiceRefundDto): Promise<InvoicePayment | Error> {
    try{
      const orderId = dto?.orderId;
      const transactionId = dto?.transactionId;
      const refundAmount = dto?.refundAmount;
      const invInfo = await this.invoicePaymentRepository.findOneByFilterQuery({invoiceId:orderId,paymentTransID:transactionId});
      if(!invInfo){
        throw new NotFoundException(
          "Invoice Not Found"
        );
      }
      const authorizePaymentConfigCms = await this.authorizePaymentConfigCmsRepository.findOneEntity();
      if(!authorizePaymentConfigCms){
        throw new BadRequestException('Failed, Payment account not configured yet.');
      }
      const totalRefundAmount = (invInfo?.refund_amount>0) ? refundAmount+invInfo?.refund_amount : refundAmount;
      if(totalRefundAmount>invInfo?.paymentAmount){
        throw new BadRequestException('Refund amount should not greater then invoice amount');
      }
      const currentDate = getCurrentDate();
      const invoiceDateFormate = formatDate(invInfo?.paymentDate);
      const refundRes = (invoiceDateFormate===currentDate)? await this.paymentService.voidTransaction(invInfo,authorizePaymentConfigCms,refundAmount,transactionId) : await this.paymentService.refundTransaction(invInfo,authorizePaymentConfigCms,refundAmount,transactionId);
      console.log('refundRes : ', refundRes);
      if(refundRes?.responseCode!==100){
        throw new BadRequestException(refundRes.responseText);
      }
      const invoiceUpdateData = {
        refund_amount:totalRefundAmount,
        refundTransId:refundRes?.transactionId,
        isRefund:1
      }
      const data = await this.invoicePaymentRepository.updateEntityByFilter({invoiceId:orderId},invoiceUpdateData);
      await this.logService.createLog('Refund payment added.');
      
      return ResponseUtils.successResponseHandler(
        200,
        'Refund payment successfully',
        'data',
        data,
      );
    }catch (e) {
      //return e?.response;
      console.log('error ', e?.response);
      if(e?.response?.statusCode===400){
        throw new BadRequestException( e.response?.message);
      }else if(e?.response?.statusCode===404){
        throw new NotFoundException(e.response?.message);
      }else if(e?.response?.message){
        throw new InternalServerErrorException(e.response?.message);
      }else{
        throw new InternalServerErrorException('Internal server error');
      }   
    }
  }

  async delete(orderId: string): Promise<void> {
    const orderInfo = await this.orderRepository.findOneByFilterQuery({orderId:orderId});
    if (!orderInfo) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }
    const data = await this.orderRepository.deleteEntity(orderInfo?._id.toString());
    if (!data) {
      throw new BadRequestException(Constants.DELETE_FAILED);
    }
    const orderDetails = await this.orderDetailsRepository.findOneByFilterQuery({orderId:orderId});
    if(orderDetails){
       await this.orderDetailsRepository.deleteEntity(orderDetails._id.toString());
    }
    const billingAddress = await this.billingAddressRepository.findOneByFilterQuery({orderId:orderId});
    if(billingAddress){
      await this.billingAddressRepository.deleteEntity(billingAddress._id.toString());
   }
    const shippingAddress = await this.shippingAddressRepository.findOneByFilterQuery({orderId:orderId});
    if(shippingAddress){
      await this.shippingAddressRepository.deleteEntity(shippingAddress._id.toString());
   }
    const invoicePayment = await this.invoicePaymentRepository.findOneByFilterQuery({invoiceId:orderId});
    if(invoicePayment){
      await this.invoicePaymentRepository.deleteEntity(invoicePayment._id.toString());
   }
   await this.logService.createLog('Order data deleted.');
   
    return ResponseUtils.buildDeletedData(
      data,
      200,
      'Order deleted successfully',
    );
  }



}
