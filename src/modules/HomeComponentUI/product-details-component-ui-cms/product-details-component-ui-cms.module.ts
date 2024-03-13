import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductDetailsComponentUiCmsController } from './product-details-component-ui-cms.controller';
import { ProductDetailsComponentUiCmsService } from './product-details-component-ui-cms.service';
import { ProductDetailsComponentUiCmsSchema } from './schema/product-details-component-ui-cms.schema';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'product_details_component_ui_cms', schema: ProductDetailsComponentUiCmsSchema }
        ])
    ],
    controllers: [ProductDetailsComponentUiCmsController],
    providers: [ProductDetailsComponentUiCmsService]
})
export class ProductDetailsComponentUiCmsModule {}
