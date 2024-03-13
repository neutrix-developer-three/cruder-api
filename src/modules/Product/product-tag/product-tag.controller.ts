import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { Constants } from "src/utils/constants";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { StaticRoutesProps } from "src/core/decorators/static-routes-props.decorator";
import { ProductTagService } from "./product-tag.service";
import { CreateProductTagDto } from "./dto/create-product-tag.dto";
import { UpdateProductTagDto } from "./dto/update-product-tag.dto";


@Controller({ path: "product-tag", version: Constants.API_VERSION_1 })

export class ProductTagController {
    constructor(private readonly service: ProductTagService) {
    }

    @Post()
    @StaticRoutesProps({ routeName: 'product-tag' })
    @UseGuards(AdminAuthGuard)
    create(@Body() dto: CreateProductTagDto) {
        return this.service.create(dto);
    }

    @Get()
    @StaticRoutesProps({ routeName: 'product-tag' })
    @UseGuards(AdminAuthGuard)
    findAll(@Query('page') pageParam?: string,
    @Query('limit') limitParam?: string) {
        return this.service.findAll(pageParam, limitParam);
    }

    @Get(":id")
    @StaticRoutesProps({ routeName: 'product-tag' })
    @UseGuards(AdminAuthGuard)
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Patch("/:id")
    @StaticRoutesProps({ routeName: 'product-tag' })
    @UseGuards(AdminAuthGuard)
    update(@Param("id") id: string, @Body() dto: UpdateProductTagDto) {
        return this.service.update(id, dto);
    }

    @Delete(":id")
    @StaticRoutesProps({ routeName: 'product-tag' })
    @UseGuards(AdminAuthGuard)
    async remove(@Param("id") id: string) {
        return await this.service.delete(id);
    }
}
