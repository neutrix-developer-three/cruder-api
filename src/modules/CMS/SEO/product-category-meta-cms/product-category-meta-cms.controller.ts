import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles, Patch, Param, Query } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { ProductCategoryMetaCmsService } from './product-category-meta-cms.service';
import { UpdateProductCategoryMetaCmsDto } from './dto/update-product-category-meta-cms.dto';

@Controller({ path: "product-category-meta-cms", version: Constants.API_VERSION_1 })
export class ProductCategoryMetaCmsController {
    constructor(private readonly service: ProductCategoryMetaCmsService) { }

    @Patch("/:categoryId")
    @StaticRoutesProps({ routeName: 'product-category-meta-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Param("categoryId") categoryId: string, @Body() dto: UpdateProductCategoryMetaCmsDto) {
        return await this.service.updateOrCreateData(categoryId, dto);
    }

    @Get()
    @UseGuards(AdminAuthGuard)
    async findAll(@Query('page') pageParam?: string,
    @Query('limit') limitParam?: string) {
        return await this.service.findAll(pageParam, limitParam);
    }
}
