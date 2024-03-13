import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductFaqController } from "./product-faq.controller";
import { ProductFaqService } from "./product-faq.service";
import { ProductFaqSchema } from "./schema/product-faq.schema";
import { ProductSchema } from "../product/schema/product.schema";


@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'product_faq', schema: ProductFaqSchema },{ name: 'products', schema: ProductSchema }]),
    ],
    controllers: [ProductFaqController],
    providers: [ProductFaqService]
})
export class ProductFaqModule {
}
