import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { Constants } from "src/utils/constants";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { StaticRoutesProps } from "src/core/decorators/static-routes-props.decorator";
import { FaqService } from "./faq.service";
import { CreateFaqDto } from "./dto/create-faq.dto";
import { UpdateFaqDto } from "./dto/update-faq.dto";


@Controller({ path: "faq", version: Constants.API_VERSION_1 })

export class FaqController {
    constructor(private readonly service: FaqService) {
    }

    @Post()
    @StaticRoutesProps({ routeName: 'faq' })
    @UseGuards(AdminAuthGuard)
    create(@Body() dto: CreateFaqDto) {
        return this.service.create(dto);
    }

    @Get()
    @StaticRoutesProps({ routeName: 'faq' })
    @UseGuards(AdminAuthGuard)
    findAll(@Query('page') pageParam?: string,
    @Query('limit') limitParam?: string) {
        return this.service.findAll(pageParam, limitParam);
    }

    @Get(":id")
    @StaticRoutesProps({ routeName: 'faq' })
    @UseGuards(AdminAuthGuard)
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Patch("/:id")
    @StaticRoutesProps({ routeName: 'faq' })
    @UseGuards(AdminAuthGuard)
    update(@Param("id") id: string, @Body() dto: UpdateFaqDto) {
        return this.service.update(id, dto);
    }

    @Delete(":id")
    @StaticRoutesProps({ routeName: 'faq' })
    @UseGuards(AdminAuthGuard)
    async remove(@Param("id") id: string) {
        return await this.service.delete(id);
    }
}
