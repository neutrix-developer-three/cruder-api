import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { ProductPageCmsSchema } from './schema/product-page-cms.schema';
import { ProductPageCmsController } from './product-page-cms.controller';
import { ProductPageCmsService } from './product-page-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'product_page_cms', schema: ProductPageCmsSchema }
        ])
    ],
    controllers: [ProductPageCmsController],
    providers: [ProductPageCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class ProductPageCmsModule {}
