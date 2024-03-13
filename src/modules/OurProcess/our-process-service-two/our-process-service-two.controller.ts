import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { Constants } from "src/utils/constants";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { UploadedMulterFileI } from "src/modules/SpacesModule/SpacesService";
import { StaticRoutesProps } from "src/core/decorators/static-routes-props.decorator";
import { OurProcessServiceTwoService } from "./our-process-service-two.service";
import { CreateOurProcessServiceTwoDto } from "./dto/create-our-process-service-two.dto";
import { UpdateOurProcessServiceTwoDto } from "./dto/update-our-process-service-two.dto";


@Controller({ path: "our-process-service-two", version: Constants.API_VERSION_1 })

export class OurProcessServiceTwoController {
    constructor(private readonly service: OurProcessServiceTwoService) {
    }

    @Post()
    @StaticRoutesProps({ routeName: 'our-process-service-two' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 }
        ]
    ))
    create(@Body() dto: CreateOurProcessServiceTwoDto,
        @UploadedFiles() files: {
            image?: UploadedMulterFileI
        }) {
        return this.service.create(dto, files);
    }

    @Get()
    @StaticRoutesProps({ routeName: 'our-process-service-two' })
    @UseGuards(AdminAuthGuard)
    findAll(@Query('page') pageParam?: string,
    @Query('limit') limitParam?: string) {
        return this.service.findAll(pageParam, limitParam);
    }

    @Get(":id")
    @StaticRoutesProps({ routeName: 'our-process-service-two' })
    @UseGuards(AdminAuthGuard)
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Patch("/:id")
    @StaticRoutesProps({ routeName: 'our-process-service-two' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 }
        ]
    ))
    update(@Param("id") id: string, @Body() dto: UpdateOurProcessServiceTwoDto,
        @UploadedFiles() files: {
            image?: UploadedMulterFileI
        }) {
        return this.service.update(id, dto, files);
    }

    @Delete(":id")
    @StaticRoutesProps({ routeName: 'our-process-service-two' })
    @UseGuards(AdminAuthGuard)
    async remove(@Param("id") id: string) {
        return await this.service.delete(id);
    }
}
