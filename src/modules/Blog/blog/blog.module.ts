import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
import { BlogController } from "./blog.controller";
import { BlogSchema } from "./schema/blog.schema";
import { BlogService } from "./blog.service";
import { SlugDetailsSchema } from "src/modules/Product/product-category/schema/slug-details.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'blogs', schema: BlogSchema },
        { name: 'slug_details', schema: SlugDetailsSchema }]),
    ],
    controllers: [BlogController],
    providers: [BlogService, DoSpacesService ,DoSpacesServicerovider]
})
export class BlogModule {
}
