import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { OurProcessPageCmsService } from './our-process-page-cms.service';
import { UpdateOurProcessPageCmsDto } from './dto/update-our-process-page-cms.dto';

@Controller({ path: "our-process-page-cms", version: Constants.API_VERSION_1 })
export class OurProcessPageCmsController {
    constructor(private readonly service: OurProcessPageCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'our-process-page-cms' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 },
            { name: "banner_image", maxCount: 1 },
            { name: "section_two_image", maxCount: 1 },
        ]
    ))
    async updateOrCreateData(@Body() dto: UpdateOurProcessPageCmsDto,
    @UploadedFiles() files: {
        image?: UploadedMulterFileI,
        banner_image?: UploadedMulterFileI,
        section_two_image?: UploadedMulterFileI,
    }) {
        return await this.service.updateOrCreateData(dto, files);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
