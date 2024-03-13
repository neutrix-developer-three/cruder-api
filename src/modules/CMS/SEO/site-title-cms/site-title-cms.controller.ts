import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { SiteTitleCmsService } from './site-title-cms.service';
import { UpdateSiteTitleCmsDto } from './dto/update-site-title-cms.dto';

@Controller({ path: "seo-site-title-cms", version: Constants.API_VERSION_1 })
export class SiteTitleCmsController {
    constructor(private readonly service: SiteTitleCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'site-title-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Body() dto: UpdateSiteTitleCmsDto) {
        return await this.service.updateOrCreateData(dto);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
