import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderSchema } from "./schema/order.schema";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { OrderDetailsSchema } from "./schema/order-details.schema";
import { BillingAddressSchema } from "./schema/billing-address.schema";
import { ShippingAddressSchema } from "./schema/shipping-address.schema";
import { CouponLogSchema } from "./schema/coupon-log.schema";
import { CouponSchema } from "../Coupon/schema/coupon.schema";
import { AuthorizePaymentConfigCmsSchema } from './../CMS/SiteSetting/authorize-payment-config-cms/schema/authorize-payment-config-cms.schema';
import { SalesTaxCmsSchema } from "../CMS/SiteSetting/sales-tax/schema/sales-tax-cms.schema";
import { InvoicePaymentSchema } from "./schema/invoice-payment.schema";
import { MailSenderService } from "../mail-sender/mail-sender.service";
import { PaymentService } from "../PaymentModule/payment.service";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'order_infos', schema: OrderSchema },
        { name: 'order_details', schema: OrderDetailsSchema },
        { name: 'billing_addresses', schema: BillingAddressSchema },
        { name: 'shipping_addresses', schema: ShippingAddressSchema },
        { name: 'coupon_log', schema: CouponLogSchema },
        { name: 'coupons', schema: CouponSchema },
        { name: 'authorize_payment_configs', schema: AuthorizePaymentConfigCmsSchema },
        { name: 'sales_taxes', schema: SalesTaxCmsSchema },
        { name: 'invoice_payments', schema: InvoicePaymentSchema }
    ]),
    ],
    controllers: [OrderController],
    providers: [OrderService,MailSenderService,PaymentService]
})
export class OrderModule {
}
