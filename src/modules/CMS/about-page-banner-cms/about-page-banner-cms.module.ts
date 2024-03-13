import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import JwtConfigService from "src/core/jwt/jwt-config.service";
import JwtHelper from "src/core/jwt/jwt.helper";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { UsersSchema } from "../../CRUD/users/schema/users.schema";
import { AboutPageBannerCMSController } from "./about-page-banner-cms.controller";
import { AboutPageBannerCMSService } from "./about-page-banner-cms.service";
import { AboutPageBannerCMSSchema } from "./schema/about-page-banner-cms.schema";

@Module({
    imports: [
        JwtModule.registerAsync({
            useClass: JwtConfigService
        }),
        MongooseModule.forFeature([
            { name: 'Users', schema: UsersSchema },
            { name: 'about_page_banner_cms', schema: AboutPageBannerCMSSchema },
        ]),
    ],
    controllers: [AboutPageBannerCMSController],
    providers: [AboutPageBannerCMSService, JwtHelper, DoSpacesService, DoSpacesServicerovider]
})
export class AboutPageBannerCMSModule {
}
