import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { TermsConditionPageCmsService } from './terms-condition-page-cms.service';
import { UpdateTermsConditionPageCmsDto } from './dto/update-terms-condition-page-cms.dto';

@Controller({ path: "seo-terms-condition-page-cms", version: Constants.API_VERSION_1 })
export class TermsConditionPageCmsController {
    constructor(private readonly service: TermsConditionPageCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'seo-terms-condition-page-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Body() dto: UpdateTermsConditionPageCmsDto) {
        return await this.service.updateOrCreateData(dto);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
