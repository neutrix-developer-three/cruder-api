import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HomeInstagramSchema } from "./schema/home-instagram.schema";
import { HomeInstagramController } from "./home-instagram.controller";
import { HomeInstagramService } from "./home-instagram.service";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'home_instagram', schema: HomeInstagramSchema }]),
    ],
    controllers: [HomeInstagramController],
    providers: [HomeInstagramService, DoSpacesService ,DoSpacesServicerovider]
})
export class HomeInstagramModule {
}
