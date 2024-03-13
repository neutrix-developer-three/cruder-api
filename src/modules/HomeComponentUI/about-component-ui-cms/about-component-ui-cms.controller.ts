import { Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { AboutComponentUiCmsService } from './about-component-ui-cms.service';
import { UpdateAboutComponentUiCmsDto } from './dto/update-about-component-ui-cms.dto';

@Controller({ path: "about-component-ui-cms", version: Constants.API_VERSION_1 })
export class AboutComponentUiCmsController {
    constructor(private readonly service: AboutComponentUiCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'about-component-ui-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Body() dto: UpdateAboutComponentUiCmsDto) {
        return await this.service.updateOrCreateData(dto);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
