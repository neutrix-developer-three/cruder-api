import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { ReturnPageCmsService } from './return-page-cms.service';
import { UpdateReturnPageCmsDto } from './dto/update-return-page-cms.dto';

@Controller({ path: "seo-return-page-cms", version: Constants.API_VERSION_1 })
export class ReturnPageCmsController {
    constructor(private readonly service: ReturnPageCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'seo-return-page-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Body() dto: UpdateReturnPageCmsDto) {
        return await this.service.updateOrCreateData(dto);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
