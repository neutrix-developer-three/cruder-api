import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
import { OurProcessServiceOneSchema } from "./schema/our-process-service-one.schema";
import { OurProcessServiceOneController } from "./our-process-service-one.controller";
import { OurProcessServiceOneService } from "./our-process-service-one.service";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'our_process_service_one', schema: OurProcessServiceOneSchema }]),
    ],
    controllers: [OurProcessServiceOneController],
    providers: [OurProcessServiceOneService, DoSpacesService ,DoSpacesServicerovider]
})
export class OurProcessServiceOneModule {
}
