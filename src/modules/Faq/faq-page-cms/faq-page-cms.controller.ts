import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { FaqPageCmsService } from './faq-page-cms.service';
import { UpdateFaqPageCmsDto } from './dto/update-faq-page-cms.dto';

@Controller({ path: "faq-page-cms", version: Constants.API_VERSION_1 })
export class FaqPageCmsController {
    constructor(private readonly service: FaqPageCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'faq-page-cms' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "banner_image", maxCount: 1 },
        ]
    ))
    async updateOrCreateData(@Body() dto: UpdateFaqPageCmsDto,
    @UploadedFiles() files: {
        banner_image?: UploadedMulterFileI,
    }) {
        return await this.service.updateOrCreateData(dto, files);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
