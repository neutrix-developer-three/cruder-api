import { Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { OurProcessComponentUiCmsService } from './our-process-component-ui-cms.service';
import { UpdateOurProcessComponentUiCmsDto } from './dto/update-our-process-component-ui-cms.dto';

@Controller({ path: "our-process-component-ui-cms", version: Constants.API_VERSION_1 })
export class OurProcessComponentUiCmsController {
    constructor(private readonly service: OurProcessComponentUiCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'our-process-component-ui-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Body() dto: UpdateOurProcessComponentUiCmsDto) {
        return await this.service.updateOrCreateData(dto);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
