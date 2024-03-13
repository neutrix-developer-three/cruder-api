import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductReturnController } from "./product-return.controller";
import { ProductReturnService } from "./product-return.service";
import { OrderSchema } from "src/modules/Order/schema/order.schema";
import { OrderDetailsSchema } from "src/modules/Order/schema/order-details.schema";
import { AuthorizePaymentConfigCmsSchema } from "src/modules/CMS/SiteSetting/authorize-payment-config-cms/schema/authorize-payment-config-cms.schema";
import { InvoicePaymentSchema } from "src/modules/Order/schema/invoice-payment.schema";
import { ProductReturnSchema } from "./schema/product-return.schema";
import { PaymentService } from "src/modules/PaymentModule/payment.service";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'order_infos', schema: OrderSchema },
            { name: 'order_details', schema: OrderDetailsSchema },
            { name: 'authorize_payment_configs', schema: AuthorizePaymentConfigCmsSchema },
            { name: 'invoice_payments', schema: InvoicePaymentSchema },
            { name: 'product_return', schema: ProductReturnSchema }
        ]),
    ],
    controllers: [ProductReturnController],
    providers: [ProductReturnService,PaymentService]
})
export class ProductReturnModule {
}
