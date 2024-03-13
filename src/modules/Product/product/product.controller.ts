import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { Constants } from "src/utils/constants";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { UploadedMulterFileI } from "src/modules/SpacesModule/SpacesService";
import { StaticRoutesProps } from "src/core/decorators/static-routes-props.decorator";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { FilterDto } from "src/core/filter.dto";


@Controller({ path: "product", version: Constants.API_VERSION_1 })

export class ProductController {
    constructor(private readonly service: ProductService) {
    }

    @Post()
    @StaticRoutesProps({ routeName: 'product' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 },
            { name: "product_images", maxCount: 20 }
        ]
    ))
    create(@Body() dto: CreateProductDto,
        @UploadedFiles() files: { image?: UploadedMulterFileI,product_images?: UploadedMulterFileI[] }) {
        return this.service.create(dto, files);
    }

    @Get()
    @StaticRoutesProps({ routeName: 'product' })
    @UseGuards(AdminAuthGuard)
    findAll() {
        return this.service.findAll();
    }

    @Get('/form-data')
    @StaticRoutesProps({ routeName: 'product' })
    @UseGuards(AdminAuthGuard)
    formData() {
        return this.service.formData();
    }

    @Post('/position-update')
    @UseGuards(AdminAuthGuard)
    updateDragPosition(@Body('productIds') productIds:string[]) {
        return this.service.updateDragPosition(productIds);
    }

    @Get(":id")
    @StaticRoutesProps({ routeName: 'product' })
    @UseGuards(AdminAuthGuard)
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Patch("/:id")
    @StaticRoutesProps({ routeName: 'product' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 },
            { name: "product_images", maxCount: 20 }
        ]
    ))
    update(@Param("id") id: string, @Body() dto: UpdateProductDto,
        @UploadedFiles() files: {
            image?: UploadedMulterFileI,
            product_images?: UploadedMulterFileI[],
        }) {
        return this.service.update(id, dto, files);
    }

    @Delete(":id")
    @StaticRoutesProps({ routeName: 'product' })
    @UseGuards(AdminAuthGuard)
    async remove(@Param("id") id: string) {
        return await this.service.delete(id);
    }
}
