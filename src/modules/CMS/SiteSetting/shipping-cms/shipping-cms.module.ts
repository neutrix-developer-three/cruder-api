import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { ShippingCmsService } from './shipping-cms.service';
import { ShippingCmsController } from './shipping-cms.controller';
import { ShippingCmsSchema } from './schema/shipping-cms.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'shipping_cms', schema: ShippingCmsSchema }
        ])
    ],
    controllers: [ShippingCmsController],
    providers: [ShippingCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class ShippingCmsModule {}
