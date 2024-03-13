import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
import { HomeIntroSchema } from "./schema/home-intro.schema";
import { HomeIntroController } from "./home-intro.controller";
import { HomeIntroService } from "./home-intro.service";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'home_intro', schema: HomeIntroSchema }]),
    ],
    controllers: [HomeIntroController],
    providers: [HomeIntroService, DoSpacesService ,DoSpacesServicerovider]
})
export class HomeIntroModule {
}
