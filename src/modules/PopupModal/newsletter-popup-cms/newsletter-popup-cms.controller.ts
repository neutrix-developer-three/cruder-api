import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { NewsletterPopupCmsService } from './newsletter-popup-cms.service';
import { UpdateNewsletterPopupCmsDto } from './dto/update-newsletter-popup-cms.dto';

@Controller({ path: "newsletter-popup-cms", version: Constants.API_VERSION_1 })
export class NewsletterPopupCmsController {
    constructor(private readonly service: NewsletterPopupCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'newsletter-popup-cms' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 },
            { name: "logo", maxCount: 1 },
        ]
    ))
    async updateOrCreateData(@Body() dto: UpdateNewsletterPopupCmsDto,
    @UploadedFiles() files: {
        image?: UploadedMulterFileI,
        logo?: UploadedMulterFileI
    }) {
        return await this.service.updateOrCreateData(dto, files);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }

    @Get('/form-data')
    @StaticRoutesProps({ routeName: 'newsletter-popup-cms' })
    @UseGuards(AdminAuthGuard)
    formData() {
        return this.service.formData();
    }
}
