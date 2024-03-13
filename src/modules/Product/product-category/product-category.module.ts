import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
import { ProductCategorySchema } from "./schema/product-category.schema";
import { ProductCategoryController } from "./product-category.controller";
import { ProductCategoryService } from "./product-category.service";
import { SlugDetailsSchema } from "./schema/slug-details.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'product_categories', schema: ProductCategorySchema },
        { name: 'slug_details', schema: SlugDetailsSchema }]),
    ],
    controllers: [ProductCategoryController],
    providers: [ProductCategoryService, DoSpacesService ,DoSpacesServicerovider]
})
export class ProductCategoryModule {
}
