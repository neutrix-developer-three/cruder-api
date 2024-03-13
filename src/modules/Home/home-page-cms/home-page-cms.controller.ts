import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { HomePageCmsService } from './home-page-cms.service';
import { UpdateHomePageCmsDto } from './dto/update-home-page-cms.dto';

@Controller({ path: "home-page-cms", version: Constants.API_VERSION_1 })
export class HomePageCmsController {
    constructor(private readonly service: HomePageCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'home-page-cms' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "testimonial_background_image", maxCount: 1 }
        ]
    ))
    async updateOrCreateData(@Body() dto: UpdateHomePageCmsDto,
    @UploadedFiles() files: {
        testimonial_background_image?: UploadedMulterFileI
    }) {
        return await this.service.updateOrCreateData(dto, files);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
