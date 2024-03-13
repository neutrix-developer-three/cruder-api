import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { Constants } from "src/utils/constants";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { StaticRoutesProps } from "src/core/decorators/static-routes-props.decorator";
import { HomeProgressWrapsService } from "./home-progress-wraps.service";
import { CreateHomeProgressWrapsDto } from "./dto/create-home-progress-wraps.dto";
import { UpdateHomeProgressWrapsDto } from "./dto/update-home-progress-wraps.dto";

@Controller({ path: "home-progress-wraps", version: Constants.API_VERSION_1 })

export class HomeProgressWrapsController {
    constructor(private readonly service: HomeProgressWrapsService) {
    }

    @Post()
    @StaticRoutesProps({ routeName: 'home-progress-wraps' })
    @UseGuards(AdminAuthGuard)
    create(@Body() dto: CreateHomeProgressWrapsDto) {
        return this.service.create(dto);
    }

    @Get()
    @StaticRoutesProps({ routeName: 'home-progress-wraps' })
    @UseGuards(AdminAuthGuard)
    findAll(@Query('page') pageParam?: string,
    @Query('limit') limitParam?: string) {
        return this.service.findAll(pageParam, limitParam);
    }

    @Get(":id")
    @StaticRoutesProps({ routeName: 'home-progress-wraps' })
    @UseGuards(AdminAuthGuard)
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Patch("/:id")
    @StaticRoutesProps({ routeName: 'home-progress-wraps' })
    @UseGuards(AdminAuthGuard)
    update(@Param("id") id: string, @Body() dto: UpdateHomeProgressWrapsDto) {
        return this.service.update(id, dto);
    }

    @Delete(":id")
    @StaticRoutesProps({ routeName: 'home-progress-wraps' })
    @UseGuards(AdminAuthGuard)
    async remove(@Param("id") id: string) {
        return await this.service.delete(id);
    }
}
