import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { Constants } from "src/utils/constants";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { UploadedMulterFileI } from "src/modules/SpacesModule/SpacesService";
import { StaticRoutesProps } from "src/core/decorators/static-routes-props.decorator";
import { ProductCategoryService } from "./product-category.service";
import { CreateProductCategoryDto } from "./dto/create-product-category.dto";
import { UpdateProductCategoryDto } from "./dto/update-product-category.dto";


@Controller({ path: "product-category", version: Constants.API_VERSION_1 })

export class ProductCategoryController {
    constructor(private readonly service: ProductCategoryService) {
    }

    @Post()
    @StaticRoutesProps({ routeName: 'product-category' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "banner_image", maxCount: 1 }
        ]
    ))
    create(@Body() dto: CreateProductCategoryDto,
        @UploadedFiles() files: {
            banner_image?: UploadedMulterFileI
        }) {
        return this.service.create(dto, files);
    }

    @Get()
    @StaticRoutesProps({ routeName: 'product-category' })
    @UseGuards(AdminAuthGuard)
    findAll() {
        return this.service.findAll();
    }

    @Get('/form-data')
    @StaticRoutesProps({ routeName: 'product-category' })
    @UseGuards(AdminAuthGuard)
    formData() {
        return this.service.formData();
    }

    @Post('/position-update')
    @UseGuards(AdminAuthGuard)
    updateDragPosition(@Body('categoryIds') categoryIds:string[]) {
        return this.service.updateDragPosition(categoryIds);
    }

    @Get(":id")
    @StaticRoutesProps({ routeName: 'product-category' })
    @UseGuards(AdminAuthGuard)
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Patch("/:id")
    @StaticRoutesProps({ routeName: 'product-category' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "banner_image", maxCount: 1 }
        ]
    ))
    update(@Param("id") id: string, @Body() dto: UpdateProductCategoryDto,
        @UploadedFiles() files: {
            banner_image?: UploadedMulterFileI
        }) {
        return this.service.update(id, dto, files);
    }

    @Delete(":id")
    @StaticRoutesProps({ routeName: 'product-category' })
    @UseGuards(AdminAuthGuard)
    async remove(@Param("id") id: string) {
        return await this.service.delete(id);
    }
}
