import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartPageComponentUiCmsSchema } from './schema/cart-page-component-ui-cms.schema';
import { CartPageComponentUiCmsController } from './cart-page-component-ui-cms.controller';
import { CartPageComponentUiCmsService } from './cart-page-component-ui-cms.service';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'cart_page_component_ui_cms', schema: CartPageComponentUiCmsSchema }
        ])
    ],
    controllers: [CartPageComponentUiCmsController],
    providers: [CartPageComponentUiCmsService]
})
export class CartPageComponentUiCmsModule {}
