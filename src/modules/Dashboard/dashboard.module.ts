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
import { SiteSettingsCmsSchema } from '../CMS/SiteSetting/site-settings-cms/schema/site-settings-cms.schema';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

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
            { name: 'site_settings_cms', schema: SiteSettingsCmsSchema }

        ]),
    ],
    controllers: [DashboardController],
    providers: [DashboardService, JwtHelper]
})

export class DashboardModule { }
