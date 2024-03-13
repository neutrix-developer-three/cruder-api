import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { Constants } from "src/utils/constants";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { StaticRoutesProps } from "src/core/decorators/static-routes-props.decorator";
import { ContactUsService } from "./contact-us.service";
import { CreateContactUsDto } from "./dto/create-contact-us.dto";
import { UpdateContactUsDto } from "./dto/update-contact-us.dto";


@Controller({ path: "contact-us", version: Constants.API_VERSION_1 })

export class ContactUsController {
    constructor(private readonly service: ContactUsService) {
    }

    @Post()
    @StaticRoutesProps({ routeName: 'contact-us' })
    create(@Body() dto: CreateContactUsDto) {
        return this.service.create(dto);
    }

    @Get()
    @StaticRoutesProps({ routeName: 'contact-us' })
    @UseGuards(AdminAuthGuard)
    findAll(@Query('page') pageParam?: string,
    @Query('limit') limitParam?: string) {
        return this.service.findAll(pageParam, limitParam);
    }

    @Get(":id")
    @StaticRoutesProps({ routeName: 'contact-us' })
    @UseGuards(AdminAuthGuard)
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Patch("/:id")
    @StaticRoutesProps({ routeName: 'contact-us' })
    @UseGuards(AdminAuthGuard)
    update(@Param("id") id: string, @Body() dto: UpdateContactUsDto) {
        return this.service.update(id, dto);
    }

    @Delete(":id")
    @StaticRoutesProps({ routeName: 'contact-us' })
    @UseGuards(AdminAuthGuard)
    async remove(@Param("id") id: string) {
        return await this.service.delete(id);
    }
}
