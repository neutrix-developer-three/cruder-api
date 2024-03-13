import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { HomeAboutCmsService } from './home-about-cms.service';
import { UpdateHomeAboutCmsDto } from './dto/update-home-about-cms.dto';

@Controller({ path: "home-about-cms", version: Constants.API_VERSION_1 })
export class HomeAboutCmsController {
    constructor(private readonly service: HomeAboutCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'home-about-cms' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 },
            { name: "about_info_icon_one", maxCount: 1 },
            { name: "about_info_icon_two", maxCount: 1 }
        ]
    ))
    async updateOrCreateData(@Body() dto: UpdateHomeAboutCmsDto,
    @UploadedFiles() files: {
        image?: UploadedMulterFileI,
        about_info_icon_one?: UploadedMulterFileI,
        about_info_icon_two?: UploadedMulterFileI
    }) {
        return await this.service.updateOrCreateData(dto, files);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
