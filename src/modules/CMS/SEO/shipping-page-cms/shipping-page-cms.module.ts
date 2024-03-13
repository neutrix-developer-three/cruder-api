import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShippingPageCmsController } from './shipping-page-cms.controller';
import { ShippingPageCmsService } from './shipping-page-cms.service';
import { ShippingPageCmsSchema } from './schema/shipping-page-cms.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'seo_shipping_page_cms', schema: ShippingPageCmsSchema }
        ])
    ],
    controllers: [ShippingPageCmsController],
    providers: [ShippingPageCmsService]
})
export class ShippingPageCmsModule {}
