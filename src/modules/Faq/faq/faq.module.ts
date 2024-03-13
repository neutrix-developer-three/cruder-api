import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
import { FaqController } from "./faq.controller";
import { FaqService } from "./faq.service";
import { FaqSchema } from "./schema/faq.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'faqs', schema: FaqSchema }]),
    ],
    controllers: [FaqController],
    providers: [FaqService, DoSpacesService ,DoSpacesServicerovider]
})
export class FaqModule {
}
