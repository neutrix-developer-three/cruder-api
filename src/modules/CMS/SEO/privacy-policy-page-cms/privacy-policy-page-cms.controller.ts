import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { PrivacyPolicyPageCmsService } from './privacy-policy-page-cms.service';
import { UpdatePrivacyPolicyPageCmsDto } from './dto/update-privacy-policy-page-cms.dto';

@Controller({ path: "seo-privacy-policy-page-cms", version: Constants.API_VERSION_1 })
export class PrivacyPolicyPageCmsController {
    constructor(private readonly service: PrivacyPolicyPageCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'seo-privacy-policy-page-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Body() dto: UpdatePrivacyPolicyPageCmsDto) {
        return await this.service.updateOrCreateData(dto);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
