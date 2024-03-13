import { Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { ProductDetailsComponentUiCmsService } from './product-details-component-ui-cms.service';
import { UpdateProductDetailsComponentUiCmsDto } from './dto/update-product-details-component-ui-cms.dto';

@Controller({ path: "product-details-component-ui-cms", version: Constants.API_VERSION_1 })
export class ProductDetailsComponentUiCmsController {
    constructor(private readonly service: ProductDetailsComponentUiCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'product-details-component-ui-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Body() dto: UpdateProductDetailsComponentUiCmsDto) {
        return await this.service.updateOrCreateData(dto);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
