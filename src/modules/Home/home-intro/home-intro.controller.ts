import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { Constants } from "src/utils/constants";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { UploadedMulterFileI } from "src/modules/SpacesModule/SpacesService";
import { StaticRoutesProps } from "src/core/decorators/static-routes-props.decorator";
import { HomeIntroService } from "./home-intro.service";
import { CreateHomeIntroDto } from "./dto/create-home-intro.dto";
import { UpdateHomeIntroDto } from "./dto/update-home-intro.dto";

@Controller({ path: "home-intro", version: Constants.API_VERSION_1 })

export class HomeIntroController {
    constructor(private readonly service: HomeIntroService) {
    }

    @Post()
    @StaticRoutesProps({ routeName: 'home-intro' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 },
            { name: "background_image", maxCount: 1 }
        ]
    ))
    create(@Body() dto: CreateHomeIntroDto,
        @UploadedFiles() files: {
            image?: UploadedMulterFileI,
            background_image?: UploadedMulterFileI
        }) {
        return this.service.create(dto, files);
    }

    @Get()
    @StaticRoutesProps({ routeName: 'home-intro' })
    @UseGuards(AdminAuthGuard)
    findAll(@Query('page') pageParam?: string,
    @Query('limit') limitParam?: string) {
        return this.service.findAll(pageParam, limitParam);
    }

    @Get(":id")
    @StaticRoutesProps({ routeName: 'home-intro' })
    @UseGuards(AdminAuthGuard)
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Patch("/:id")
    @StaticRoutesProps({ routeName: 'home-intro' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 },
            { name: "background_image", maxCount: 1 }
        ]
    ))
    update(@Param("id") id: string, @Body() dto: UpdateHomeIntroDto,
        @UploadedFiles() files: {
            image?: UploadedMulterFileI,
            background_image?: UploadedMulterFileI
        }) {
        return this.service.update(id, dto, files);
    }

    @Delete(":id")
    @StaticRoutesProps({ routeName: 'home-intro' })
    @UseGuards(AdminAuthGuard)
    async remove(@Param("id") id: string) {
        return await this.service.delete(id);
    }
}
