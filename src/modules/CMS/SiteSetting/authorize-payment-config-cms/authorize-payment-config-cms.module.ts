import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorizePaymentConfigCmsSchema } from './schema/authorize-payment-config-cms.schema';
import { AuthorizePaymentConfigCmsController } from './authorize-payment-config-cms.controller';
import { AuthorizePaymentConfigCmsService } from './authorize-payment-config-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'authorize_payment_configs', schema: AuthorizePaymentConfigCmsSchema }
        ])
    ],
    controllers: [AuthorizePaymentConfigCmsController],
    providers: [AuthorizePaymentConfigCmsService]
})
export class AuthorizePaymentConfigCmsModule {}
