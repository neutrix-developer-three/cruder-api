import { Body, Controller, Get, HttpCode, HttpStatus, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { UploadedMulterFileI } from "src/modules/SpacesModule/SpacesService";
import { Constants } from "src/utils/constants";
import { AboutPageBannerCMSService } from "./about-page-banner-cms.service";
import { UpdateAboutPageBannerCMSDto } from "./dto/update-about-page-banner-cms.dto";

@Controller({ path: "about-page-banner-cms", version: Constants.API_VERSION_1 })

export class AboutPageBannerCMSController {
    constructor(private readonly service: AboutPageBannerCMSService) {
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "backgroundImage", maxCount: 1 }
        ]
    ))
    updateOrCreateData(
        @Body() dto: UpdateAboutPageBannerCMSDto,
        @UploadedFiles() files: {
            backgroundImage?: UploadedMulterFileI
        }
    ) {
        return this.service.updateOrCreateData(dto, files);
    }

    @Get()
    // @UseGuards(AdminAuthGuard)
    findAll() {
        return this.service.findAll();
    }
}
