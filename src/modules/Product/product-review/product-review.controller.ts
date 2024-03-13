import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { Constants } from "src/utils/constants";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { UploadedMulterFileI } from "src/modules/SpacesModule/SpacesService";
import { StaticRoutesProps } from "src/core/decorators/static-routes-props.decorator";
import { ProductReviewService } from "./product-review.service";
import { CreateProductReviewDto } from "./dto/create-product-review.dto";
import { UpdateProductReviewDto } from "./dto/update-product-review.dto";
import { AuthGuard } from "src/core/guards/auth.guard";
import { CreateUserProductReviewDto } from "./dto/create-user-product-review.dto";



@Controller({ path: "product-review", version: Constants.API_VERSION_1 })

export class ProductReviewController {
    constructor(private readonly service: ProductReviewService) {
    }

    @Post()
    @StaticRoutesProps({ routeName: 'product-review' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "reviewerImage", maxCount: 1 }
        ]
    ))
    create(@Body() dto: CreateProductReviewDto,
        @UploadedFiles() files: {
            reviewerImage?: UploadedMulterFileI
        }) {
        return this.service.create(dto, files);
    }

    @Post('user-review')
    @UseGuards(AuthGuard)
    createUserReview(@Body() dto: CreateUserProductReviewDto, @Req() request) {
        const user = request?.user;
        dto.userId =user?._id; 
        dto.reviewerName =user?.fullName; 
        dto.reviewerImage =user?.image; 
        return this.service.createUserReview(dto);
    }

    @Get()
    @StaticRoutesProps({ routeName: 'product-review' })
    @UseGuards(AdminAuthGuard)
    findAll(@Query('page') pageParam?: string,
    @Query('limit') limitParam?: string) {
        return this.service.findAll(pageParam, limitParam);
    }

    @Get('/form-data')
    @StaticRoutesProps({ routeName: 'product-review' })
    @UseGuards(AdminAuthGuard)
    formData() {
        return this.service.formData();
    }

    @Get(":id")
    @StaticRoutesProps({ routeName: 'product-review' })
    @UseGuards(AdminAuthGuard)
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Patch("/:id")
    @StaticRoutesProps({ routeName: 'product-review' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "reviewerImage", maxCount: 1 }
        ]
    ))
    update(@Param("id") id: string, @Body() dto: UpdateProductReviewDto,
        @UploadedFiles() files: {
            reviewerImage?: UploadedMulterFileI
        }) {
        return this.service.update(id, dto, files);
    }

    @Delete(":id")
    @StaticRoutesProps({ routeName: 'product-review' })
    @UseGuards(AdminAuthGuard)
    async remove(@Param("id") id: string) {
        return await this.service.delete(id);
    }
}
