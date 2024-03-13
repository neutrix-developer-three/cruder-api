import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { Constants } from "src/utils/constants";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { UploadedMulterFileI } from "src/modules/SpacesModule/SpacesService";
import { StaticRoutesProps } from "src/core/decorators/static-routes-props.decorator";
import { OfferProductService } from "./offer-product.service";
import { CreateOfferProductDto } from "./dto/create-offer-product.dto";
import { UpdateOfferProductDto } from "./dto/update-offer-product.dto";


@Controller({ path: "offer-product", version: Constants.API_VERSION_1 })

export class OfferProductController {
    constructor(private readonly service: OfferProductService) {
    }

    @Post()
    @StaticRoutesProps({ routeName: 'offer-product' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 }
        ]
    ))
    create(@Body() dto: CreateOfferProductDto,
        @UploadedFiles() files: {
            image?: UploadedMulterFileI
        }) {
        return this.service.create(dto, files);
    }

    @Get()
    @StaticRoutesProps({ routeName: 'offer-product' })
    @UseGuards(AdminAuthGuard)
    findAll(@Query('page') pageParam?: string,
    @Query('limit') limitParam?: string) {
        return this.service.findAll(pageParam, limitParam);
    }

    @Get('/form-data')
    @StaticRoutesProps({ routeName: 'offer-product' })
    @UseGuards(AdminAuthGuard)
    formData() {
        return this.service.formData();
    }

    @Get("/category-wise-product/:categoryId")
    @StaticRoutesProps({ routeName: 'offer-product' })
    @UseGuards(AdminAuthGuard)
    findAllCategoryWiseProduct(@Param("categoryId") categoryId: string) {
        console.log('categoryId : ', categoryId);
        return this.service.findAllCategoryWiseProduct(categoryId);
    }

    @Get(":id")
    @StaticRoutesProps({ routeName: 'offer-product' })
    @UseGuards(AdminAuthGuard)
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Patch("/:id")
    @StaticRoutesProps({ routeName: 'offer-product' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 }
        ]
    ))
    update(@Param("id") id: string, @Body() dto: UpdateOfferProductDto,
        @UploadedFiles() files: {
            image?: UploadedMulterFileI
        }) {
        return this.service.update(id, dto, files);
    }

    @Delete(":id")
    @StaticRoutesProps({ routeName: 'offer-product' })
    @UseGuards(AdminAuthGuard)
    async remove(@Param("id") id: string) {
        return await this.service.delete(id);
    }
}
