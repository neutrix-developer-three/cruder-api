import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { CartCmsService } from './cart-cms.service';
import { UpdateCartCmsDto } from './dto/update-cart-cms.dto';

@Controller({ path: "cart-cms", version: Constants.API_VERSION_1 })
export class CartCmsController {
    constructor(private readonly service: CartCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'cart-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Body() dto: UpdateCartCmsDto) {
        return await this.service.updateOrCreateData(dto);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
