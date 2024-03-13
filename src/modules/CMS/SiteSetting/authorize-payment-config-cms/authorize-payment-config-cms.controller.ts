import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { AuthorizePaymentConfigCmsService } from './authorize-payment-config-cms.service';
import { UpdateAuthorizePaymentConfigCmsDto } from './dto/update-authorize-payment-config-cms.dto';


@Controller({ path: "authorize-payment-config-cms", version: Constants.API_VERSION_1 })
export class AuthorizePaymentConfigCmsController {
    constructor(private readonly service: AuthorizePaymentConfigCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'authorize-payment-config-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Body() dto: UpdateAuthorizePaymentConfigCmsDto) {
        return await this.service.updateOrCreateData(dto);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
