import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { AboutUsPageCmsService } from './about-us-page-cms.service';
import { UpdateAboutUsPageCmsDto } from './dto/update-about-us-page-cms.dto';

@Controller({ path: "about-us-page-cms", version: Constants.API_VERSION_1 })
export class AboutUsPageCmsController {
    constructor(private readonly service: AboutUsPageCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'about-us-page-cms' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "banner_image", maxCount: 1 },
        ]
    ))
    async updateOrCreateData(@Body() dto: UpdateAboutUsPageCmsDto,
    @UploadedFiles() files: {
        banner_image?: UploadedMulterFileI
    }) {
        return await this.service.updateOrCreateData(dto, files);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
