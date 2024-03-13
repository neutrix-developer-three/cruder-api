import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles, Patch, Param, Query } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { ProductMetaCmsService } from './product-meta-cms.service';
import { UpdateProductMetaCmsDto } from './dto/update-product-meta-cms.dto';
import { FilterDto } from 'src/core/filter.dto';

@Controller({ path: "product-meta-cms", version: Constants.API_VERSION_1 })
export class ProductMetaCmsController {
    constructor(private readonly service: ProductMetaCmsService) { }

    @Patch("/:productId")
    @StaticRoutesProps({ routeName: 'product-meta-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Param("productId") productId: string, @Body() dto: UpdateProductMetaCmsDto) {
        return await this.service.updateOrCreateData(productId, dto);
    }

    @Get()
    @UseGuards(AdminAuthGuard)
    async findAll(@Query() filterDto:FilterDto) {
        return await this.service.findAll(filterDto);
    }
}
