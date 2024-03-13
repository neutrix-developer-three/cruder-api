import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { FaqMetaCmsService } from './faq-meta-cms.service';
import { UpdateFaqMetaCmsDto } from './dto/update-faq-meta-cms.dto';

@Controller({ path: "seo-faq-meta-cms", version: Constants.API_VERSION_1 })
export class FaqMetaCmsController {
    constructor(private readonly service: FaqMetaCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'seo-faq-meta-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Body() dto: UpdateFaqMetaCmsDto) {
        return await this.service.updateOrCreateData(dto);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
