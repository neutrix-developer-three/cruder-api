import { Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { CartPageComponentUiCmsService } from './cart-page-component-ui-cms.service';
import { UpdateCartPageComponentUiCmsDto } from './dto/update-cart-page-component-ui-cms.dto';

@Controller({ path: "cart-page-component-ui-cms", version: Constants.API_VERSION_1 })
export class CartPageComponentUiCmsController {
    constructor(private readonly service: CartPageComponentUiCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'cart-page-component-ui-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Body() dto: UpdateCartPageComponentUiCmsDto) {
        return await this.service.updateOrCreateData(dto);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
