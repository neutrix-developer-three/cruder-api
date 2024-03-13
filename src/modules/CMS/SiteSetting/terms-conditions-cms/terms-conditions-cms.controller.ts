import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { TermsConditionsCmsService } from './terms-conditions-cms.service';
import { UpdateTermsConditionsCmsDto } from './dto/update-terms-conditions-cms.dto';

@Controller({ path: "terms-conditions-cms", version: Constants.API_VERSION_1 })
export class TermsConditionsCmsController {
    constructor(private readonly service: TermsConditionsCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'terms-conditions-cms' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "banner_image", maxCount: 1 }
        ]
    ))
    async updateOrCreateData(@Body() dto: UpdateTermsConditionsCmsDto,
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
