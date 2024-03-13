import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { Constants } from "src/utils/constants";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { StaticRoutesProps } from "src/core/decorators/static-routes-props.decorator";
import { ProductReturnService } from "./product-return.service";
import { AuthGuard } from "src/core/guards/auth.guard";
import { CreateProductReturnDto } from "./dto/create-product-return.dto";
import { ProductReturnStatusUpdateDto } from "./dto/product-return-status-update.dto";


@Controller({ path: "product-return", version: Constants.API_VERSION_1 })

export class ProductReturnController {
    constructor(private readonly service: ProductReturnService) {
    }

    @Post()
    @StaticRoutesProps({ routeName: 'product-return' })
    @UseGuards(AuthGuard)
    create(@Body() dto: CreateProductReturnDto,@Req() request) {
        const user = request?.user;
        return this.service.create(dto, user);
    }

    @Post('/admin')
    @StaticRoutesProps({ routeName: 'product-return' })
    @UseGuards(AdminAuthGuard)
    createAdmin(@Body() dto: CreateProductReturnDto,@Req() request) {
        const user = request?.user;
        return this.service.createAdmin(dto, user);
    }


    @Get(':status')
    @StaticRoutesProps({ routeName: 'product-return' })
    @UseGuards(AdminAuthGuard)
    findAll(@Param("status") status: string,@Query('page') pageParam?: string,
    @Query('limit') limitParam?: string) {
        return this.service.findAll(status,pageParam, limitParam);
    }


    @Post('/update-status')
    @StaticRoutesProps({ routeName: 'product-return' })
    @UseGuards(AdminAuthGuard)
    updateReturnStatus(@Body() dto: ProductReturnStatusUpdateDto,@Req() request) {
        const user = request?.user;
        return this.service.updateReturnStatus(dto, user);
    }

    
}
