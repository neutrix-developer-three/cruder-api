import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { Constants } from "src/utils/constants";
// import {AdminAuthGuard} from "src/core/guards/admin-auth.guard";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { UploadedMulterFileI } from "src/modules/SpacesModule/SpacesService";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller({ path: "category", version: Constants.API_VERSION_1 })

export class CategoryController {
    constructor(private readonly service: CategoryService) {
    }

    @Post()
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "icon", maxCount: 1 }
        ]
    ))
    create(@Body() dto: CreateCategoryDto,
        @UploadedFiles() files: {
            icon?: UploadedMulterFileI
        }) {
        return this.service.create(dto, files);
    }

    @Get()
    // @UseGuards(AdminAuthGuard)
    findAll() {
        return this.service.findAll();
    }

    @Get(":id")
    // @UseGuards(AdminAuthGuard)
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Patch("/:id")
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "icon", maxCount: 1 }
        ]
    ))
    update(@Param("id") id: string, @Body() dto: UpdateCategoryDto,
        @UploadedFiles() files: {
            icon?: UploadedMulterFileI
        }) {
        return this.service.update(id, dto, files);
    }

    @Delete(":id")
    @UseGuards(AdminAuthGuard)
    async remove(@Param("id") id: string) {
        return await this.service.delete(id);
    }
}
