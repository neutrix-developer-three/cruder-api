import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Order } from '../Order/schema/order.schema';
import { OrderRepository } from '../Order/order.repository';
import { SiteSettingsCms } from '../CMS/SiteSetting/site-settings-cms/schema/site-settings-cms.schema';
import { SiteSettingsCmsRepository } from '../CMS/SiteSetting/site-settings-cms/site-settings-cms-repository';
import { OrderDetails } from '../Order/schema/order-details.schema';
import { InvoicePayment } from '../Order/schema/invoice-payment.schema';
import { OrderDetailsRepository } from '../Order/order-details.repository';
import { InvoicePaymentRepository } from '../Order/invoice-payment.repository';
import { Users } from '../CRUD/users/schema/users.schema';
import { UsersRepository } from '../CRUD/users/users.repository';
import { getCurrentDate } from 'src/utils/dates.utils';
import { SalesReportDto } from './dto/sales-report.dto';
import { ProfitReportDto } from './dto/profit-report.dto';
import { PaymentReportDto } from './dto/payment-report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel('order_infos') private readonly orderModel: Model<Order>,
    @InjectModel('site_settings_cms')
    private readonly siteSettingsCmsModel: Model<SiteSettingsCms>,
    @InjectModel('order_details')
    private readonly orderDetailsModel: Model<OrderDetails>,
    @InjectModel('invoice_payments')
    private readonly invoicePaymentModel: Model<InvoicePayment>,
    @InjectModel('Users') private readonly usersModel: Model<Users>,
  ) {}

  private readonly orderRepository = new OrderRepository(this.orderModel);
  private readonly siteSettingsCmsRepository = new SiteSettingsCmsRepository(
    this.siteSettingsCmsModel,
  );
  private readonly orderDetailsRepository = new OrderDetailsRepository(
    this.orderDetailsModel,
  );
  private readonly invoicePaymentRepository = new InvoicePaymentRepository(
    this.invoicePaymentModel,
  );
  private readonly usersRepository = new UsersRepository(this.usersModel);

  async getSalesReportData(): Promise<any | Error> {
    const currentDate = getCurrentDate();
    const [reportData, user] = await Promise.all([
      this.orderRepository.findByDateSaleData(currentDate),
      this.usersRepository.findAllReportUser(),
    ]);

    const data = {
      reportData,
      user,
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getFilterSalesReportData(dto: SalesReportDto): Promise<any | Error> {
    const orderId = dto?.orderId; 
    const startDate = dto?.startDate; 
    const endDate = dto?.endDate; 
    const customerId = dto?.customerId; 
    const paymentStatus = dto?.paymentStatus; 
    let query: any;
    if (orderId) {
      query = { ...query, orderId: orderId };
    }
    if (customerId) {
      query = { ...query, customerId: customerId };
    }
    if (paymentStatus) {
      query = { ...query, paymentStatus: paymentStatus };
    }
    if (startDate && endDate) {
      query = {
        ...query,
        createdAt: {
          $gte: new Date(`${startDate}T00:00:00Z`),
          $lt: new Date(`${endDate}T23:59:59Z`),
        },
      };
    }else{
      if(startDate){
        query = {
          ...query,
          createdAt: {
            $gte: new Date(`${startDate}T00:00:00Z`)
          },
        };
      }
      if(endDate){
        query = {
          ...query,
          createdAt: {
            $lt: new Date(`${endDate}T23:59:59Z`)
          },
        };
      }
    }
    const reportData = await this.orderRepository.findAllSalesReportFilter(query);

    const data = {
      reportData
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getProfitReportData(): Promise<any | Error> {
    const currentDate = getCurrentDate();

    let query = {
      createdAt: {
        $gte: new Date(`${currentDate}T00:00:00Z`),
        $lt: new Date(`${currentDate}T23:59:59Z`),
      },
    };
    const [reportData, user] = await Promise.all([
      this.orderDetailsRepository.findAllByFilterProfitReportData(query),
      this.usersRepository.findAllReportUser(),
    ]);

    const data = {
      reportData,
      user,
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getFilterProfitReportData(dto: ProfitReportDto): Promise<any | Error> {
    const orderId = dto?.orderId; 
    const startDate = dto?.startDate; 
    const endDate = dto?.endDate; 
    const customerId = dto?.customerId; 
    let query: any;
    if (orderId) {
      query = { ...query, orderId: orderId };
    }
    if (customerId) {
      query = { ...query, customerId: customerId };
    }
    if (startDate && endDate) {
      query = {
        ...query,
        createdAt: {
          $gte: new Date(`${startDate}T00:00:00Z`),
          $lt: new Date(`${endDate}T23:59:59Z`),
        },
      };
    }else{
      if(startDate){
        query = {
          ...query,
          createdAt: {
            $gte: new Date(`${startDate}T00:00:00Z`)
          },
        };
      }
      if(endDate){
        query = {
          ...query,
          createdAt: {
            $lt: new Date(`${endDate}T23:59:59Z`)
          },
        };
      }
    }
    const reportData = await this.orderDetailsRepository.findAllByFilterProfitReportData(query);

    const data = {
      reportData
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getPaymentReportData(): Promise<any | Error> {
    const currentDate = getCurrentDate();

    let query = {
      createdAt: {
        $gte: new Date(`${currentDate}T00:00:00Z`),
        $lt: new Date(`${currentDate}T23:59:59Z`),
      },
    };
    const [reportData, user] = await Promise.all([
      this.invoicePaymentRepository.findAllReportPaymentByFilterQuery(query),
      this.usersRepository.findAllReportUser(),
    ]);

    const data = {
      reportData,
      user,
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async getFilterPaymentReportData(dto: PaymentReportDto): Promise<any | Error> {
    const orderId = dto?.orderId; 
    const startDate = dto?.startDate; 
    const endDate = dto?.endDate; 
    const customerId = dto?.customerId; 
    const refundStatus = dto?.refundStatus; 
    let query: any;
    if (orderId) {
      query = { ...query, invoiceId: orderId };
    }
    if (customerId) {
      query = { ...query, customerId: customerId };
    }
    if (startDate && endDate) {
      query = {
        ...query,
        createdAt: {
          $gte: new Date(`${startDate}T00:00:00Z`),
          $lt: new Date(`${endDate}T23:59:59Z`),
        },
      };
    }else{
      if(startDate){
        query = {
          ...query,
          createdAt: {
            $gte: new Date(`${startDate}T00:00:00Z`)
          },
        };
      }
      if(endDate){
        query = {
          ...query,
          createdAt: {
            $lt: new Date(`${endDate}T23:59:59Z`)
          },
        };
      }
    }
    if(refundStatus){
      const isRefund = (refundStatus==='yes')?1:0;
      query = { ...query, isRefund: isRefund };
    }
    const reportData = await this.invoicePaymentRepository.findAllReportPaymentByFilterQuery(query);

    const data = {
      reportData
    };

    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }


  
}
