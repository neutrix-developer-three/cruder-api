import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { Constants } from "src/utils/constants";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { StaticRoutesProps } from "src/core/decorators/static-routes-props.decorator";
import { SubscribeEmailService } from "./subscribe-email.service";
import { CreateSubscribeEmailDto } from "./dto/create-subscribe-email";
import { UpdateSubscribeEmailDto } from "./dto/update-subscribe-email.dto";
import { FilterDto } from "src/core/filter.dto";

@Controller({ path: "subscribe-email", version: Constants.API_VERSION_1 })

export class SubscribeEmailController {
    constructor(private readonly service: SubscribeEmailService) {
    }

    @Post()
    create(@Body() dto: CreateSubscribeEmailDto) {
        return this.service.create(dto);
    }

    @Get()
    @StaticRoutesProps({ routeName: 'subscribe-email' })
    @UseGuards(AdminAuthGuard)
    findAll(@Query() filterDto:FilterDto) {
        return this.service.findAll(filterDto);
    }

    @Get(":id")
    @StaticRoutesProps({ routeName: 'subscribe-email' })
    @UseGuards(AdminAuthGuard)
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Patch("/:id")
    @StaticRoutesProps({ routeName: 'subscribe-email' })
    @UseGuards(AdminAuthGuard)
    update(@Param("id") id: string, @Body() dto: UpdateSubscribeEmailDto) {
        return this.service.update(id, dto);
    }

    @Delete(":id")
    @StaticRoutesProps({ routeName: 'subscribe-email' })
    @UseGuards(AdminAuthGuard)
    async remove(@Param("id") id: string) {
        return await this.service.delete(id);
    }
}
