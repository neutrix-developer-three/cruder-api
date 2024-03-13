import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { Constants } from "src/utils/constants";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { UploadedMulterFileI } from "src/modules/SpacesModule/SpacesService";
import { StaticRoutesProps } from "src/core/decorators/static-routes-props.decorator";
import { HomeTestimonialsService } from "./home-testimonials.service";
import { CreateHomeTestimonialsDto } from "./dto/create-home-testimonials.dto";
import { UpdateHomeTestimonialsDto } from "./dto/update-home-testimonials.dto";

@Controller({ path: "home-testimonials", version: Constants.API_VERSION_1 })

export class HomeTestimonialsController {
    constructor(private readonly service: HomeTestimonialsService) {
    }

    @Post()
    @StaticRoutesProps({ routeName: 'home-testimonials' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 }
        ]
    ))
    create(@Body() dto: CreateHomeTestimonialsDto,
        @UploadedFiles() files: {
            image?: UploadedMulterFileI
        }) {
        return this.service.create(dto, files);
    }

    @Get()
    @StaticRoutesProps({ routeName: 'home-testimonials' })
    @UseGuards(AdminAuthGuard)
    findAll(@Query('page') pageParam?: string,
    @Query('limit') limitParam?: string) {
        return this.service.findAll(pageParam, limitParam);
    }

    @Get(":id")
    @StaticRoutesProps({ routeName: 'home-testimonials' })
    @UseGuards(AdminAuthGuard)
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Patch("/:id")
    @StaticRoutesProps({ routeName: 'home-testimonials' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 }
        ]
    ))
    update(@Param("id") id: string, @Body() dto: UpdateHomeTestimonialsDto,
        @UploadedFiles() files: {
            image?: UploadedMulterFileI
        }) {
        return this.service.update(id, dto, files);
    }

    @Delete(":id")
    @StaticRoutesProps({ routeName: 'home-testimonials' })
    @UseGuards(AdminAuthGuard)
    async remove(@Param("id") id: string) {
        return await this.service.delete(id);
    }
}
