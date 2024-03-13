import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { ShippingPageCmsService } from './shipping-page-cms.service';
import { UpdateShippingPageCmsDto } from './dto/update-shipping-page-cms.dto';

@Controller({ path: "seo-shipping-page-cms", version: Constants.API_VERSION_1 })
export class ShippingPageCmsController {
    constructor(private readonly service: ShippingPageCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'seo-shipping-page-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Body() dto: UpdateShippingPageCmsDto) {
        return await this.service.updateOrCreateData(dto);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
