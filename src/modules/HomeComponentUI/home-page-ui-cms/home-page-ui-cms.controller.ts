import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { HomePageUiCmsService } from './home-page-ui-cms.service';
import { UpdateHomePageUiCmsDto } from './dto/update-home-page-ui-cms.dto';

@Controller({ path: "home-page-ui-cms", version: Constants.API_VERSION_1 })
export class HomePageUiCmsController {
    constructor(private readonly service: HomePageUiCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'home-page-ui-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Body() dto: UpdateHomePageUiCmsDto) {
        return await this.service.updateOrCreateData(dto);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
