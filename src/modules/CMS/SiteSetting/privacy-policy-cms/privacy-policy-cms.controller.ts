import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { PrivacyPolicyCmsService } from './privacy-policy-cms.service';
import { UpdatePrivacyPolicyCmsDto } from './dto/update-privacy-policy-cms.dto';

@Controller({ path: "privacy-policy-cms", version: Constants.API_VERSION_1 })
export class PrivacyPolicyCmsController {
    constructor(private readonly service: PrivacyPolicyCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'privacy-policy-cms' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "banner_image", maxCount: 1 }
        ]
    ))
    async updateOrCreateData(@Body() dto: UpdatePrivacyPolicyCmsDto,
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
