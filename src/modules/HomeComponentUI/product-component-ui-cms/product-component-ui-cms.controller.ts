import { Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { ProductComponentUiCmsService } from './product-component-ui-cms.service';
import { UpdateProductComponentUiCmsDto } from './dto/update-product-component-ui-cms.dto';

@Controller({ path: "product-component-ui-cms", version: Constants.API_VERSION_1 })
export class ProductComponentUiCmsController {
    constructor(private readonly service: ProductComponentUiCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'product-component-ui-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Body() dto: UpdateProductComponentUiCmsDto) {
        return await this.service.updateOrCreateData(dto);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
