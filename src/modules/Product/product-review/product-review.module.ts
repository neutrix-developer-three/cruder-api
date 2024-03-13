import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
import { ProductSchema } from "../product/schema/product.schema";
import { ProductReviewController } from "./product-review.controller";
import { ProductReviewService } from "./product-review.service";
import { ProductReviewSchema } from "./schema/product-review.schema";


@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'product_review', schema: ProductReviewSchema },
        { name: 'products', schema: ProductSchema }]),
    ],
    controllers: [ProductReviewController],
    providers: [ProductReviewService, DoSpacesService ,DoSpacesServicerovider]
})
export class ProductReviewModule {
}
