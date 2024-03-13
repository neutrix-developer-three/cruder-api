import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { SalesTaxCmsService } from './sales-tax-cms.service';
import { UpdateSalesTaxCmsDto } from './dto/update-sales-tax-cms.dto';

@Controller({ path: "sales-tax-cms", version: Constants.API_VERSION_1 })
export class SalesTaxCmsController {
    constructor(private readonly service: SalesTaxCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'sales-tax-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Body() dto: UpdateSalesTaxCmsDto) {
        return await this.service.updateOrCreateData(dto);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
