import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import JwtConfigService from 'src/core/jwt/jwt-config.service';
import JwtHelper from 'src/core/jwt/jwt.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from '../CRUD/users/schema/users.schema';
import { OrderSchema } from '../Order/schema/order.schema';
import { OrderDetailsSchema } from '../Order/schema/order-details.schema';
import { BillingAddressSchema } from '../Order/schema/billing-address.schema';
import { ShippingAddressSchema } from '../Order/schema/shipping-address.schema';
import { InvoicePaymentSchema } from '../Order/schema/invoice-payment.schema';
import { AdminOrderController } from './admin-order.controller';
import { AdminOrderService } from './admin-order.service';
import { SiteSettingsCmsSchema } from '../CMS/SiteSetting/site-settings-cms/schema/site-settings-cms.schema';
import { AuthorizePaymentConfigCmsSchema } from '../CMS/SiteSetting/authorize-payment-config-cms/schema/authorize-payment-config-cms.schema';
import { SalesTaxCmsSchema } from '../CMS/SiteSetting/sales-tax/schema/sales-tax-cms.schema';
import { ProductSchema } from '../Product/product/schema/product.schema';
import { PaymentService } from '../PaymentModule/payment.service';



@Module({
    imports: [
        JwtModule.registerAsync({
            useClass: JwtConfigService
        }),

        MongooseModule.forFeature([
            { name: 'Users', schema: UsersSchema },
            { name: 'order_infos', schema: OrderSchema },
            { name: 'order_details', schema: OrderDetailsSchema },
            { name: 'billing_addresses', schema: BillingAddressSchema },
            { name: 'shipping_addresses', schema: ShippingAddressSchema },
            { name: 'invoice_payments', schema: InvoicePaymentSchema },
            { name: 'site_settings_cms', schema: SiteSettingsCmsSchema },
            { name: 'authorize_payment_configs', schema: AuthorizePaymentConfigCmsSchema },
            { name: 'sales_taxes', schema: SalesTaxCmsSchema },
            { name: 'products', schema: ProductSchema },

        ]),
    ],
    controllers: [AdminOrderController],
    providers: [AdminOrderService, JwtHelper,PaymentService]
})

export class AdminOrderModule { }
