import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
import { ProductCategorySchema } from "../product-category/schema/product-category.schema";
import { ProductSchema } from "./schema/product.schema";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { ProductTagSchema } from "../product-tag/schema/product-tag.schema";
import { SlugDetailsSchema } from "../product-category/schema/slug-details.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'product_categories', schema: ProductCategorySchema },
        { name: 'products', schema: ProductSchema },
        { name: 'product_tag', schema: ProductTagSchema },
        { name: 'slug_details', schema: SlugDetailsSchema }]),
    ],
    controllers: [ProductController],
    providers: [ProductService, DoSpacesService ,DoSpacesServicerovider]
})
export class ProductModule {
}
