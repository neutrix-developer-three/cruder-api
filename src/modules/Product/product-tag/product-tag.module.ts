import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
import { ProductTagSchema } from "./schema/product-tag.schema";
import { ProductTagController } from "./product-tag.controller";
import { ProductTagService } from "./product-tag.service";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'product_tag', schema: ProductTagSchema }]),
    ],
    controllers: [ProductTagController],
    providers: [ProductTagService, DoSpacesService ,DoSpacesServicerovider]
})
export class ProductTagModule {
}
