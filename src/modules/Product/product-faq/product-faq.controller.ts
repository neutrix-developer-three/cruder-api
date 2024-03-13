import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { Constants } from "src/utils/constants";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { StaticRoutesProps } from "src/core/decorators/static-routes-props.decorator";
import { ProductFaqService } from "./product-faq.service";
import { CreateProductFaqDto } from "./dto/create-product-faq.dto";
import { UpdateProductFaqDto } from "./dto/update-product-faq.dto";



@Controller({ path: "product-faq", version: Constants.API_VERSION_1 })

export class ProductFaqController {
    constructor(private readonly service: ProductFaqService) {
    }

    @Post()
    @StaticRoutesProps({ routeName: 'product-faq' })
    @UseGuards(AdminAuthGuard)
    create(@Body() dto: CreateProductFaqDto) {
        return this.service.create(dto);
    }

    @Get()
    @StaticRoutesProps({ routeName: 'product-faq' })
    @UseGuards(AdminAuthGuard)
    findAll(@Query('page') pageParam?: string,
    @Query('limit') limitParam?: string) {
        return this.service.findAll(pageParam, limitParam);
    }

    @Get('/form-data')
    @StaticRoutesProps({ routeName: 'product-faq' })
    @UseGuards(AdminAuthGuard)
    formData() {
        return this.service.formData();
    }

    @Get(":id")
    @StaticRoutesProps({ routeName: 'product-faq' })
    @UseGuards(AdminAuthGuard)
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Patch("/:id")
    @StaticRoutesProps({ routeName: 'product-faq' })
    @UseGuards(AdminAuthGuard)
    update(@Param("id") id: string, @Body() dto: UpdateProductFaqDto) {
        return this.service.update(id, dto);
    }

    @Delete(":id")
    @StaticRoutesProps({ routeName: 'product-faq' })
    @UseGuards(AdminAuthGuard)
    async remove(@Param("id") id: string) {
        return await this.service.delete(id);
    }
}
