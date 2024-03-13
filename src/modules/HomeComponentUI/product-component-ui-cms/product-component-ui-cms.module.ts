import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductComponentUiCmsSchema } from './schema/product-component-ui-cms.schema';
import { ProductComponentUiCmsController } from './product-component-ui-cms.controller';
import { ProductComponentUiCmsService } from './product-component-ui-cms.service';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'product_component_ui_cms', schema: ProductComponentUiCmsSchema }
        ])
    ],
    controllers: [ProductComponentUiCmsController],
    providers: [ProductComponentUiCmsService]
})
export class ProductComponentUiCmsModule {}
