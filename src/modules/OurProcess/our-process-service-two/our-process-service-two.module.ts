import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
import { OurProcessServiceTwoSchema } from "./schema/our-process-service-two.schema";
import { OurProcessServiceTwoController } from "./our-process-service-two.controller";
import { OurProcessServiceTwoService } from "./our-process-service-two.service";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'our_process_service_two', schema: OurProcessServiceTwoSchema }]),
    ],
    controllers: [OurProcessServiceTwoController],
    providers: [OurProcessServiceTwoService, DoSpacesService ,DoSpacesServicerovider]
})
export class OurProcessServiceTwoModule {
}
