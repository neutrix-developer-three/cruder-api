import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductCategoryFaqSchema } from "./schema/product-category-faq.schema";
import { ProductCategoryFaqController } from "./product-category-faq.controller";
import { ProductCategoryFaqService } from "./product-category-faq.service";
import { ProductCategorySchema } from "../product-category/schema/product-category.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'product_category_faq', schema: ProductCategoryFaqSchema },{ name: 'product_categories', schema: ProductCategorySchema }]),
    ],
    controllers: [ProductCategoryFaqController],
    providers: [ProductCategoryFaqService]
})
export class ProductCategoryFaqModule {
}
