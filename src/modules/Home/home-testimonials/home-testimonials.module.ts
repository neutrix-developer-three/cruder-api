import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
import { HomeTestimonialsSchema } from "./schema/home-testimonials.schema";
import { HomeTestimonialsController } from "./home-testimonials.controller";
import { HomeTestimonialsService } from "./home-testimonials.service";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'home_testimonials', schema: HomeTestimonialsSchema }]),
    ],
    controllers: [HomeTestimonialsController],
    providers: [HomeTestimonialsService, DoSpacesService ,DoSpacesServicerovider]
})
export class HomeTestimonialsModule {
}
