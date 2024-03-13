import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { Constants } from "src/utils/constants";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { StaticRoutesProps } from "src/core/decorators/static-routes-props.decorator";
import { ProductCategoryFaqService } from "./product-category-faq.service";
import { CreateProductCategoryFaqDto } from "./dto/create-product-category-faq.dto";
import { UpdateProductCategoryFaqDto } from "./dto/update-product-category-faq.dto";


@Controller({ path: "product-category-faq", version: Constants.API_VERSION_1 })

export class ProductCategoryFaqController {
    constructor(private readonly service: ProductCategoryFaqService) {
    }

    @Post()
    @StaticRoutesProps({ routeName: 'product-category-faq' })
    @UseGuards(AdminAuthGuard)
    create(@Body() dto: CreateProductCategoryFaqDto) {
        return this.service.create(dto);
    }

    @Get()
    @StaticRoutesProps({ routeName: 'product-category-faq' })
    @UseGuards(AdminAuthGuard)
    findAll(@Query('page') pageParam?: string,
    @Query('limit') limitParam?: string) {
        return this.service.findAll(pageParam, limitParam);
    }

    @Get(":id")
    @StaticRoutesProps({ routeName: 'product-category-faq' })
    @UseGuards(AdminAuthGuard)
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Patch("/:id")
    @StaticRoutesProps({ routeName: 'product-category-faq' })
    @UseGuards(AdminAuthGuard)
    update(@Param("id") id: string, @Body() dto: UpdateProductCategoryFaqDto) {
        return this.service.update(id, dto);
    }

    @Delete(":id")
    @StaticRoutesProps({ routeName: 'product-category-faq' })
    @UseGuards(AdminAuthGuard)
    async remove(@Param("id") id: string) {
        return await this.service.delete(id);
    }
}
