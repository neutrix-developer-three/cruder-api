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
import { getCurrentDate } from 'src/utils/dates.utils';

@Injectable()
export class DashboardService {
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


  
  async getAdminDashboardData(): Promise<any | Error> {
    const currentDate = getCurrentDate();
    const [order,todayOrder,totalOrder,statusPending,statusApproved,statusRejected,totalTodayOrder,todayPending,todayApproved,todayRejected] = await Promise.all([
      this.orderRepository.findAdminDashboardPageOrder(),
      this.orderRepository.findAdminTodayOrder(currentDate),
      this.orderRepository.countTotalOrder(),
      this.orderRepository.countTotalOrder({status:'Pending'}),
      this.orderRepository.countTotalOrder({status:'Approved'}),
      this.orderRepository.countTotalOrder({status:'Rejected'}),
      this.orderRepository.countTodayTotalOrder(currentDate),
      this.orderRepository.countTodayTotalOrder(currentDate,{status:'Pending'}),
      this.orderRepository.countTodayTotalOrder(currentDate,{status:'Approved'}),
      this.orderRepository.countTodayTotalOrder(currentDate,{status:'Rejected'})
    ]);
    // const order =
    //   await this.orderRepository.findAdminDashboardPageOrder();
    // const todayOrder = await this.orderRepository.findAdminTodayOrder(currentDate);
    //  const totalOrder = await this.orderRepository.countTotalOrder();
    //  const statusPending = await this.orderRepository.countTotalOrder({status:'Pending'});
    // const statusApproved = await this.orderRepository.countTotalOrder({status:'Approved'});
    // const statusRejected = await this.orderRepository.countTotalOrder({status:'Rejected'});

    // const totalTodayOrder = await this.orderRepository.countTodayTotalOrder(currentDate);
    //  const todayPending = await this.orderRepository.countTodayTotalOrder(currentDate,{status:'Pending'});
    // const todayApproved = await this.orderRepository.countTodayTotalOrder(currentDate,{status:'Approved'});
    // const todayRejected = await this.orderRepository.countTodayTotalOrder(currentDate,{status:'Rejected'});
    const data = {
      order,
      todayOrder,
      totalOrder,
      statusPending,
      statusApproved,
      statusRejected,
      totalTodayOrder,
      todayPending,
      todayApproved,
      todayRejected
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }



}
