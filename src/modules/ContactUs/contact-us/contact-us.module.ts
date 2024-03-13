import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
import { ContactUsSchema } from "./schema/contact-us.schema";
import { ContactUsController } from "./contact-us.controller";
import { ContactUsService } from "./contact-us.service";

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: 'contact_us', schema: ContactUsSchema }]),
    ],
    controllers: [ContactUsController],
    providers: [ContactUsService, DoSpacesService ,DoSpacesServicerovider]
})
export class ContactUsModule {
}
