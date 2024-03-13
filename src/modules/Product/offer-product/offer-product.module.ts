import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
import { OfferProductController } from "./offer-product.controller";
import { OfferProductService } from "./offer-product.service";
import { ProductCategorySchema } from "../product-category/schema/product-category.schema";
import { ProductSchema } from "../product/schema/product.schema";
import { OfferProductSchema } from "./schema/offer-product.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'product_categories', schema: ProductCategorySchema },
        { name: 'products', schema: ProductSchema },
        { name: 'offer_product', schema: OfferProductSchema }]),
    ],
    controllers: [OfferProductController],
    providers: [OfferProductService, DoSpacesService ,DoSpacesServicerovider]
})
export class OfferProductModule {
}
