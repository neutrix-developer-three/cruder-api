import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
import { HomeGallerySchema } from "./schema/home-gallery.schema";
import { HomeGalleryController } from "./home-gallery.controller";
import { HomeGalleryService } from "./home-gallery.service";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'home_gallery', schema: HomeGallerySchema }]),
    ],
    controllers: [HomeGalleryController],
    providers: [HomeGalleryService, DoSpacesService ,DoSpacesServicerovider]
})
export class HomeGalleryModule {
}
