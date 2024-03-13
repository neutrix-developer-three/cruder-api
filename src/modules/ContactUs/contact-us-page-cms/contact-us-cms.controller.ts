import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { ContactUsCmsService } from './contact-us-cms.service';
import { UpdateContactUsCmsDto } from './dto/update-contact-us-cms.dto';

@Controller({ path: "contact-us-cms", version: Constants.API_VERSION_1 })
export class ContactUsCmsController {
    constructor(private readonly service: ContactUsCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'contact-us-cms' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 },
            { name: "banner_image", maxCount: 1 },
            { name: "location_background_image", maxCount: 1 },
            { name: "email_icon", maxCount: 1 },
            { name: "call_icon", maxCount: 1 },
            { name: "social_icon_1", maxCount: 1 },
            { name: "social_icon_2", maxCount: 1 },
            { name: "social_icon_3", maxCount: 1 },
            { name: "social_icon_4", maxCount: 1 },
        ]
    ))
    async updateOrCreateData(@Body() dto: UpdateContactUsCmsDto,
    @UploadedFiles() files: {
        banner_image?: UploadedMulterFileI,
        image?: UploadedMulterFileI,
        location_background_image?: UploadedMulterFileI,
        email_icon?: UploadedMulterFileI,
        call_icon?: UploadedMulterFileI,
        social_icon_1?: UploadedMulterFileI,
        social_icon_2?: UploadedMulterFileI,
        social_icon_3?: UploadedMulterFileI,
        social_icon_4?: UploadedMulterFileI,
    }) {
        return await this.service.updateOrCreateData(dto, files);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
