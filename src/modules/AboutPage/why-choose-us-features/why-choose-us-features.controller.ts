import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { Constants } from "src/utils/constants";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { UploadedMulterFileI } from "src/modules/SpacesModule/SpacesService";
import { WhyChooseUsFeaturesService } from "./why-choose-us-features.service";
import { CreateWhyChooseUsFeaturesDto } from "./dto/create-why-choose-us-features.dto";
import { UpdateWhyChooseUsFeaturesDto } from "./dto/update-why-choose-us-features.dto";
import { StaticRoutesProps } from "src/core/decorators/static-routes-props.decorator";


@Controller({ path: "about-why-choose-us-features", version: Constants.API_VERSION_1 })

export class WhyChooseUsFeaturesController {
    constructor(private readonly service: WhyChooseUsFeaturesService) {
    }

    @Post()
    @StaticRoutesProps({ routeName: 'about-why-choose-us-features' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 }
        ]
    ))
    create(@Body() dto: CreateWhyChooseUsFeaturesDto,
        @UploadedFiles() files: {
            image?: UploadedMulterFileI
        }) {
        return this.service.create(dto, files);
    }

    @Get()
    @StaticRoutesProps({ routeName: 'about-why-choose-us-features' })
    @UseGuards(AdminAuthGuard)
    findAll(@Query('page') pageParam?: string,
    @Query('limit') limitParam?: string) {
        return this.service.findAll(pageParam, limitParam);
    }

    @Get(":id")
    @StaticRoutesProps({ routeName: 'about-why-choose-us-features' })
    @UseGuards(AdminAuthGuard)
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Patch("/:id")
    @StaticRoutesProps({ routeName: 'about-why-choose-us-features' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 }
        ]
    ))
    update(@Param("id") id: string, @Body() dto: UpdateWhyChooseUsFeaturesDto,
        @UploadedFiles() files: {
            image?: UploadedMulterFileI
        }) {
        return this.service.update(id, dto, files);
    }

    @Delete(":id")
    @StaticRoutesProps({ routeName: 'about-why-choose-us-features' })
    @UseGuards(AdminAuthGuard)
    async remove(@Param("id") id: string) {
        return await this.service.delete(id);
    }
}
