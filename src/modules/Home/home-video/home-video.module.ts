import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
import { HomeVideoSchema } from "./schema/home-video.schema";
import { HomeVideoController } from "./home-video.controller";
import { HomeVideoService } from "./home-video.service";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'home_video', schema: HomeVideoSchema }]),
    ],
    controllers: [HomeVideoController],
    providers: [HomeVideoService, DoSpacesService ,DoSpacesServicerovider]
})
export class HomeVideoModule {
}
