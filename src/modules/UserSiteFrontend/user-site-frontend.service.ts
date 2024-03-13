import { Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class UserSiteFrontendService {
  constructor(
    @InjectModel('order_infos') private readonly orderModel: Model<Order>,
    @InjectModel('site_settings_cms')
    private readonly siteSettingsCmsModel: Model<SiteSettingsCms>,
    @InjectModel('order_details') private readonly orderDetailsModel: Model<OrderDetails>,
    @InjectModel('billing_addresses') private readonly billingAddressModel: Model<BillingAddress>,
    @InjectModel('shipping_addresses') private readonly shippingAddressModel: Model<ShippingAddress>,
    @InjectModel('invoice_payments')
    private readonly invoicePaymentModel: Model<InvoicePayment>,
    @InjectModel('Users') private readonly usersModel: Model<Users>
  ) {}

  private readonly orderRepository = new OrderRepository(this.orderModel);
  private readonly siteSettingsCmsRepository = new SiteSettingsCmsRepository(
    this.siteSettingsCmsModel
);
private readonly orderDetailsRepository = new OrderDetailsRepository(this.orderDetailsModel);
private readonly billingAddressRepository = new BillingAddressRepository(this.billingAddressModel);
private readonly shippingAddressRepository = new ShippingAddressRepository(this.shippingAddressModel);
private readonly invoicePaymentRepository = new InvoicePaymentRepository(
  this.invoicePaymentModel
);
private readonly usersRepository = new UsersRepository(this.usersModel);


  
  async getUserDashboardData(user:any): Promise<any | Error> {
    const [order,totalOrder,statusPending,statusApproved,statusRejected] =  await Promise.all([
      this.orderRepository.findUserDashboardPageOrder({customerId:user?._id}),
      this.orderRepository.countAllUserOrder({customerId:user?._id}),
      this.orderRepository.countAllUserOrder({customerId:user?._id,status:'Pending'}),
      this.orderRepository.countAllUserOrder({customerId:user?._id,status:'Approved'}),
      this.orderRepository.countAllUserOrder({customerId:user?._id,status:'Rejected'})
    ])
    const data = {
      order,
      totalOrder,
      statusPending,
      statusApproved,
      statusRejected
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getUserAllOrderData(user:any): Promise<any | Error> {
    const order =
      await this.orderRepository.findAllByFilter({customerId:user?._id});
    
    const data = {
      order
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getUserAllCompleteOrderData(user:any): Promise<any | Error> {
    const order =
      await this.orderRepository.findAllByFilter({customerId:user?._id,status:'Approved'});
    
    const data = {
      order
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getUserAllPendingOrderData(user:any): Promise<any | Error> {
    const order =
      await this.orderRepository.findAllByFilter({customerId:user?._id,status:'Pending'});
    
    const data = {
      order
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getUserAllRejectOrderData(user:any): Promise<any | Error> {
    const order =
      await this.orderRepository.findAllByFilter({customerId:user?._id,status:'Rejected'});
    
    const data = {
      order
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async orderTrackingData(orderNumber:string,user:any): Promise<any | Error> {
    const order =
      await this.orderRepository.findOneOrderByFilterQuery(orderNumber, user._id);  
    if(!order){
      throw new NotFoundException('Invalid Order Tracking ID');
    }
    const orderId = order.orderId;
    const [orderDetailsInfo,invoicePaymentInfo,billingInfo,shippingInfo,siteSetting] = await Promise.all([
      this.orderDetailsRepository.findAllByFilterQuery({orderId:orderId}),
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

  async getUserProfileData(user:any): Promise<any | Error> {
    const data =
      await this.usersRepository.findOneEntity(user?._id);  
    
    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async findUserOrderDetails(orderId:string,user:any): Promise<any | Error> {
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

  


}
