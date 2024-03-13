import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { Constants } from "src/utils/constants";
import { AdminAuthGuard } from "src/core/guards/admin-auth.guard";
import { StaticRoutesProps } from "src/core/decorators/static-routes-props.decorator";
import { CreateCouponDto } from "./dto/create-coupon.dto";
import { UpdateCouponDto } from "./dto/update-coupon.dto";
import { CouponService } from "./coupon.service";
import { FilterDto } from "src/core/filter.dto";



@Controller({ path: "coupon", version: Constants.API_VERSION_1 })

export class CouponController {
    constructor(private readonly service: CouponService) {
    }

    @Post()
    @StaticRoutesProps({ routeName: 'coupon' })
    @UseGuards(AdminAuthGuard)
    create(@Body() dto: CreateCouponDto) {
        return this.service.create(dto);
    }
    @Get()
    @StaticRoutesProps({ routeName: 'coupon' })
    @UseGuards(AdminAuthGuard)
    findAll(@Query() filterDto:FilterDto) {
        return this.service.findAll(filterDto);
    }

    @Get('/form-data')
    @StaticRoutesProps({ routeName: 'coupon' })
    @UseGuards(AdminAuthGuard)
    formData() {
        return this.service.formData();
    }
    @Post('/checkCoupon')
    checkCoupon(@Body('coupon_code') coupon_code) {
        return this.service.checkCoupon(coupon_code);
    }

    @Get(":id")
    @StaticRoutesProps({ routeName: 'coupon' })
    @UseGuards(AdminAuthGuard)
    findOne(@Param("id") id: string) {
        return this.service.findOne(id);
    }

    @Patch("/:id")
    @StaticRoutesProps({ routeName: 'coupon' })
    @UseGuards(AdminAuthGuard)
    update(@Param("id") id: string, @Body() dto: UpdateCouponDto) {
        return this.service.update(id, dto);
    }

    @Delete(":id")
    @StaticRoutesProps({ routeName: 'coupon' })
    @UseGuards(AdminAuthGuard)
    async remove(@Param("id") id: string) {
        return await this.service.delete(id);
    }
}
