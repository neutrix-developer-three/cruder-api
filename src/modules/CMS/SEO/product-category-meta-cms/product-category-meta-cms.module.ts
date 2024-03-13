import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCategorySchema } from 'src/modules/Product/product-category/schema/product-category.schema';
import { ProductCategoryMetaCmsSchema } from './schema/product-category-meta-cms.schema';
import { ProductCategoryMetaCmsController } from './product-category-meta-cms.controller';
import { ProductCategoryMetaCmsService } from './product-category-meta-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'product_category_meta_cms', schema: ProductCategoryMetaCmsSchema },
            { name: 'product_categories', schema: ProductCategorySchema }
        ])
    ],
    controllers: [ProductCategoryMetaCmsController],
    providers: [ProductCategoryMetaCmsService]
})
export class ProductCategoryMetaCmsModule {}
