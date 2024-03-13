import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductMetaCmsSchema } from './schema/product-meta-cms.schema';
import { ProductMetaCmsController } from './product-meta-cms.controller';
import { ProductMetaCmsService } from './product-meta-cms.service';
import { ProductSchema } from 'src/modules/Product/product/schema/product.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'product_meta_cms', schema: ProductMetaCmsSchema },
            { name: 'products', schema: ProductSchema }
        ])
    ],
    controllers: [ProductMetaCmsController],
    providers: [ProductMetaCmsService]
})
export class ProductMetaCmsModule {}
