import { Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { SubscribePageComponentUiCmsService } from './subscribe-page-component-ui-cms.service';
import { UpdateSubscribePageComponentUiCmsDto } from './dto/update-subscribe-page-component-ui-cms.dto';

@Controller({ path: "subscribe-page-component-ui-cms", version: Constants.API_VERSION_1 })
export class SubscribePageComponentUiCmsController {
    constructor(private readonly service: SubscribePageComponentUiCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'subscribe-page-component-ui-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Body() dto: UpdateSubscribePageComponentUiCmsDto) {
        return await this.service.updateOrCreateData(dto);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
