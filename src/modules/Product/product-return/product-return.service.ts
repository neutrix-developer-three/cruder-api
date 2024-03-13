import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { ProductCategory } from '../product-category/schema/product-category.schema';
import { ProductReturn } from './schema/product-return.schema';
import { ProductReturnRepository } from './product-return.repository';
import { CreateProductReturnDto } from './dto/create-product-return.dto';
import { Order } from 'src/modules/Order/schema/order.schema';
import { OrderDetails } from 'src/modules/Order/schema/order-details.schema';
import { InvoicePayment } from 'src/modules/Order/schema/invoice-payment.schema';
import { OrderRepository } from 'src/modules/Order/order.repository';
import { OrderDetailsRepository } from 'src/modules/Order/order-details.repository';
import { InvoicePaymentRepository } from 'src/modules/Order/invoice-payment.repository';
import { AuthorizePaymentConfigCms } from 'src/modules/CMS/SiteSetting/authorize-payment-config-cms/schema/authorize-payment-config-cms.schema';
import { AuthorizePaymentConfigCmsRepository } from 'src/modules/CMS/SiteSetting/authorize-payment-config-cms/authorize-payment-config-cms-repository';
import { Users } from 'src/modules/CRUD/users/schema/users.schema';
import { CreateOrderDto } from 'src/modules/Order/dto/create-order.dto';
import { CreateOrderDetailsDto } from 'src/modules/Order/dto/create-order-details.dto';
import { formatDate, getCurrentDate } from 'src/utils/dates.utils';
import { PaymentService } from 'src/modules/PaymentModule/payment.service';
import { ProductReturnStatusUpdateDto } from './dto/product-return-status-update.dto';
import { UpdateProductReturnDto } from './dto/update-product-return.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';


@Injectable()
export class ProductReturnService {
  constructor(
    private readonly paymentService: PaymentService,
    @InjectModel('product_return') private readonly productReturnModel: Model<ProductReturn>,
    @InjectModel('order_infos') private readonly orderModel: Model<Order>,
    @InjectModel('order_details') private readonly orderDetailsModel: Model<OrderDetails>,
    @InjectModel('invoice_payments')
    private readonly invoicePaymentModel: Model<InvoicePayment>,
    @InjectModel('authorize_payment_configs')
    private readonly authorizeConfigCmsModel: Model<AuthorizePaymentConfigCms>,
    private readonly logService: LogActivityService
    ) { }

    private readonly productReturnRepository = new ProductReturnRepository(this.productReturnModel);
    private readonly orderRepository = new OrderRepository(this.orderModel);
    private readonly orderDetailsRepository = new OrderDetailsRepository(this.orderDetailsModel);
    private readonly invoicePaymentRepository = new InvoicePaymentRepository(
      this.invoicePaymentModel
    );
    private readonly authorizePaymentConfigCmsRepository = new AuthorizePaymentConfigCmsRepository(
      this.authorizeConfigCmsModel
    );

  async create(dto: CreateProductReturnDto, user:Users): Promise<ProductReturn> {
    const orderId = dto?.orderId;
    const orderDetails = await this.orderDetailsRepository.findOneByFilterQuery({orderId:orderId,productId:dto.productId});
    if (!orderDetails) {
        throw new NotFoundException(
            "Order details Not Found"
        );
    }
    if(orderDetails?.isReturn==='Approved' || orderDetails?.isReturn==='Unapproved' || orderDetails?.isReturn==='Rejected'){
      throw new BadRequestException(
        `Product return already ${orderDetails?.isReturn}`
      );
    }
    if(dto.quantity>orderDetails.quantity){
        throw new BadRequestException(
          "Return quantity should not greater then order quantity"
        );
    }
    const orderInfo = await this.orderRepository.findOneByFilterQuery({orderId:orderId});
    if(!orderInfo){
      throw new NotFoundException(
        "Order Not Found"
      );
    }
    if(orderInfo.coupon_amount>0){
      throw new BadRequestException(
        "Return are not allowed when using coupon in order"
      );
    }
    dto.productName=orderDetails.productName;
    dto.customerName=orderDetails.customerName;
    const tax_rate=orderDetails.tax_rate;
    const itemPrice = orderDetails.discountWithPrice;

    const productAmount = itemPrice*dto.quantity;
    const tax_amount = (productAmount * tax_rate) / 100;
    const payableAmount = productAmount + tax_amount;
    dto.sales_tax=tax_amount;
    dto.payableAmount=payableAmount;
    dto.itemPrice=itemPrice;
    dto.totalPrice=productAmount;
    dto.payableAmount=payableAmount;
    dto.updated_by=user.email; 

    const data = await this.productReturnRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(
        Constants.CREATE_FAILED,
      );
    }
    const orderUpdateData = {
      isReturn:dto.status
    } as CreateOrderDto;

    await this.orderRepository.updateEntityByFilter({orderId:orderId}, orderUpdateData);

    const orderDetailsUpdateData = {
      isReturn:dto.status
    } as CreateOrderDetailsDto;

    await this.orderDetailsRepository.updateEntityByFilter({orderId:orderId,productId:dto.productId}, orderDetailsUpdateData);

    return ResponseUtils.successResponseHandler(201, "Successfully created data.", "data", data);
  }

  async findAll(status:string,pageParam?: string, limitParam?: string): Promise<ProductReturn[]> {
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    const data = await this.productReturnRepository.paginate(page,limit, {status:status});
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async createAdmin(dto: CreateProductReturnDto, user:Users): Promise<ProductReturn> {
    try{
      const orderId = dto?.orderId;
      const status = dto?.status;
      if(status!=='Approved'){
        throw new BadRequestException('Staus should be Approved');
      }
      const orderDetails = await this.orderDetailsRepository.findOneByFilterQuery({orderId:orderId,productId:dto.productId});
      if (!orderDetails) {
          throw new NotFoundException(
              "Order Not Found"
          );
      }
      if(orderDetails?.isReturn==='Approved' || orderDetails?.isReturn==='Unapproved' || orderDetails?.isReturn==='Rejected'){
        throw new BadRequestException(
          `Product return already ${orderDetails?.isReturn}`
        );
      }
      if(dto.quantity>orderDetails.quantity){
          throw new BadRequestException(
            "Return quantity should not greater then order quantity"
          );
      }
      const orderInfo = await this.orderRepository.findOneByFilterQuery({orderId:orderId});
      if(!orderInfo){
        throw new NotFoundException(
          "Order Not Found"
        );
      }
      if(orderInfo.coupon_amount>0){
        throw new BadRequestException(
          "Return are not allowed when using coupon in order"
        );
      }
      const authorizePaymentConfigCms = await this.authorizePaymentConfigCmsRepository.findOneEntity();
      if(!authorizePaymentConfigCms){
        throw new BadRequestException('Failed, Payment account not configured yet.');
      }
      const invoiceInfo = await this.invoicePaymentRepository.findOneByFilterQuery({invoiceId:orderId});
      if(!invoiceInfo){
        throw new NotFoundException(
          "Invoice Not Found"
        );
      }
      dto.productName=orderDetails.productName;
      dto.customerName=orderDetails.customerName;
      const tax_rate=orderDetails.tax_rate;
      const itemPrice = orderDetails.discountWithPrice;

      const productAmount = itemPrice*dto.quantity;
      const tax_amount = (productAmount * tax_rate) / 100;
      const payableAmount = productAmount + tax_amount;
      dto.sales_tax=tax_amount;
      dto.payableAmount=payableAmount;
      dto.itemPrice=itemPrice;
      dto.totalPrice=productAmount;
      dto.payableAmount=payableAmount;
      dto.updated_by=user.email; 
      const transactionId = invoiceInfo?.paymentTransID;
      const currentDate = getCurrentDate();
      const invoiceDateFormate = formatDate(invoiceInfo?.paymentDate);
      const refundRes = (invoiceDateFormate===currentDate)? await this.paymentService.voidTransaction(invoiceInfo,authorizePaymentConfigCms,payableAmount,transactionId) : await this.paymentService.refundTransaction(invoiceInfo,authorizePaymentConfigCms,payableAmount,transactionId);
      console.log('refundRes : ', refundRes);
      if(refundRes?.responseCode!==100){
        throw new BadRequestException(refundRes.responseText);
      }
      const data = await this.productReturnRepository.createEntity(dto);
      if (!data) {
        throw new BadRequestException(
          Constants.CREATE_FAILED,
        );
      }
      const orderUpdateData = {
        isReturn:dto.status
      } as CreateOrderDto;

      await this.orderRepository.updateEntityByFilter({orderId:orderId}, orderUpdateData);

      const orderDetailsUpdateData = {
        isReturn:dto.status
      } as CreateOrderDetailsDto;

      await this.orderDetailsRepository.updateEntityByFilter({orderId:orderId}, orderDetailsUpdateData);
      let refund_amount=payableAmount;
      if(invoiceInfo.refund_amount>0){
        refund_amount+=invoiceInfo.refund_amount;
      }
      const invoiceUpdateData = {
        refund_amount:refund_amount,
        refundTransId:refundRes?.transactionId,
        isRefund:1
      }
      await this.invoicePaymentRepository.updateEntityByFilter({invoiceId:orderId},invoiceUpdateData);
      await this.logService.createLog('Admin Product return added.');

      return ResponseUtils.successResponseHandler(201, "Successfully created data.", "data", data);
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

  async updateReturnStatus(dto: ProductReturnStatusUpdateDto, user:Users): Promise<ProductReturn> {
    const orderId = dto?.orderId;
    const productId = dto?.productId;
    const returnId = dto?.returnId;
    const status = dto?.status;
    const orderDetails = await this.orderDetailsRepository.findOneByFilterQuery({orderId:orderId,productId:productId});
    if (!orderDetails) {
        throw new NotFoundException(
            "Order details Not Found"
        );
    }
    if(orderDetails?.isReturn==='Approved'){
      throw new BadRequestException(
        `Product return already ${orderDetails?.isReturn}`
      );
    }

    if(status==='Approved'){
      const authorizePaymentConfigCms = await this.authorizePaymentConfigCmsRepository.findOneEntity();
      if(!authorizePaymentConfigCms){
        throw new BadRequestException('Failed, Payment account not configured yet.');
      }
      const invoiceInfo = await this.invoicePaymentRepository.findOneByFilterQuery({invoiceId:orderId});
      if(!invoiceInfo){
        throw new NotFoundException(
          "Invoice Not Found"
        );
      }
      const transactionId = invoiceInfo?.paymentTransID;
      const currentDate = getCurrentDate();
      const invoiceDateFormate = formatDate(invoiceInfo?.paymentDate);
      const tax_rate=orderDetails.tax_rate;
      const itemPrice = orderDetails.discountWithPrice;
      const quantity = orderDetails.quantity;
      const productAmount = itemPrice*quantity;
      const tax_amount = (productAmount * tax_rate) / 100;
      const payableAmount = productAmount + tax_amount;
      const refundRes = (invoiceDateFormate===currentDate)? await this.paymentService.voidTransaction(invoiceInfo,authorizePaymentConfigCms,payableAmount,transactionId) : await this.paymentService.refundTransaction(invoiceInfo,authorizePaymentConfigCms,payableAmount,transactionId);
      console.log('refundRes : ', refundRes);
      if(refundRes?.responseCode!==100){
        throw new BadRequestException(refundRes.responseText);
      }
      let refund_amount=payableAmount;
      if(invoiceInfo.refund_amount>0){
        refund_amount+=invoiceInfo.refund_amount;
      }
      const invoiceUpdateData = {
        refund_amount:refund_amount,
        refundTransId:refundRes?.transactionId,
        isRefund:1
      }
      await this.invoicePaymentRepository.updateEntityByFilter({invoiceId:orderId},invoiceUpdateData);

    }
    
    
    const orderUpdateData = {
      isReturn:status
    } as CreateOrderDto;

    await this.orderRepository.updateEntityByFilter({orderId:orderId}, orderUpdateData);

    const orderDetailsUpdateData = {
      isReturn:status
    } as CreateOrderDetailsDto;

    await this.orderDetailsRepository.updateEntityByFilter({orderId:orderId}, orderDetailsUpdateData);
    const returnUpdateData = {
      status:status
    } as UpdateProductReturnDto;
    const data = await this.productReturnRepository.updateEntity(returnId,returnUpdateData);
    await this.logService.createLog('Product return status updated.');

    return ResponseUtils.successResponseHandler(201, "Successfully updated data.", "data", data);
  }

  

  
  
 
}