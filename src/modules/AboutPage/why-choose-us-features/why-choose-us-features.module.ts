import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
import { WhyChooseUsFeaturesController } from "./why-choose-us-features.controller";
import { WhyChooseUsFeaturesService } from "./why-choose-us-features.service";
import { WhyChooseUsFeaturesSchema } from "./schema/why-choose-us-features.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'about_why_choose_us_features', schema: WhyChooseUsFeaturesSchema }]),
    ],
    controllers: [WhyChooseUsFeaturesController],
    providers: [WhyChooseUsFeaturesService, DoSpacesService ,DoSpacesServicerovider]
})
export class WhyChooseUsFeaturesModule {
}
