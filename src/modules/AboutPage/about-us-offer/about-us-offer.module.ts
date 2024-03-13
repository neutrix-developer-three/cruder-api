import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
import { AboutUsOfferSchema } from "./schema/about-us-offer.schema";
import { AboutUsOfferController } from "./about-us-offer.controller";
import { AboutUsOfferService } from "./about-us-offer.service";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'about_us_offer', schema: AboutUsOfferSchema }]),
    ],
    controllers: [AboutUsOfferController],
    providers: [AboutUsOfferService, DoSpacesService ,DoSpacesServicerovider]
})
export class AboutUsOfferModule {
}
