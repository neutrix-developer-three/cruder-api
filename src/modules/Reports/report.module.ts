import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import JwtConfigService from 'src/core/jwt/jwt-config.service';
import JwtHelper from 'src/core/jwt/jwt.helper';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from '../CRUD/users/schema/users.schema';
import { OrderSchema } from '../Order/schema/order.schema';
import { OrderDetailsSchema } from '../Order/schema/order-details.schema';
import { InvoicePaymentSchema } from '../Order/schema/invoice-payment.schema';
import { SiteSettingsCmsSchema } from '../CMS/SiteSetting/site-settings-cms/schema/site-settings-cms.schema';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';


@Module({
    imports: [
        JwtModule.registerAsync({
            useClass: JwtConfigService
        }),

        MongooseModule.forFeature([
            { name: 'Users', schema: UsersSchema },
            { name: 'order_infos', schema: OrderSchema },
            { name: 'order_details', schema: OrderDetailsSchema },
            { name: 'invoice_payments', schema: InvoicePaymentSchema },
            { name: 'site_settings_cms', schema: SiteSettingsCmsSchema }
        ]),
    ],
    controllers: [ReportController],
    providers: [ReportService, JwtHelper]
})

export class ReportModule { }
