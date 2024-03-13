import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartCmsController } from './cart-cms.controller';
import { CartCmsService } from './cart-cms.service';
import { CartCmsSchema } from './schema/cart-cms.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'cart_cms', schema: CartCmsSchema }
        ])
    ],
    controllers: [CartCmsController],
    providers: [CartCmsService]
})
export class CartCmsModule {}
