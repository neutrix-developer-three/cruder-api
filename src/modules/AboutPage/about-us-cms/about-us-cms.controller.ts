import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { AboutUsCmsService } from './about-us-cms.service';
import { UpdateAboutUsCmsDto } from './dto/update-about-us-cms.dto';

@Controller({ path: "about-us-cms", version: Constants.API_VERSION_1 })
export class AboutUsCmsController {
    constructor(private readonly service: AboutUsCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'about-us-cms' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 },
            { name: "about_item_icon_one", maxCount: 1 },
            { name: "about_item_icon_two", maxCount: 1 },
        ]
    ))
    async updateOrCreateData(@Body() dto: UpdateAboutUsCmsDto,
    @UploadedFiles() files: {
        image?: UploadedMulterFileI,
        about_item_icon_one?: UploadedMulterFileI,
        about_item_icon_two?: UploadedMulterFileI,
    }) {
        return await this.service.updateOrCreateData(dto, files);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
