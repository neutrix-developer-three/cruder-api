import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { ShippingCmsService } from './shipping-cms.service';
import { UpdateShippingCmsDto } from './dto/update-shipping-cms.dto';

@Controller({ path: "shipping-cms", version: Constants.API_VERSION_1 })
export class ShippingCmsController {
    constructor(private readonly service: ShippingCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'shipping-cms' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "banner_image", maxCount: 1 }
        ]
    ))
    async updateOrCreateData(@Body() dto: UpdateShippingCmsDto,
    @UploadedFiles() files: {
        banner_image?: UploadedMulterFileI
    }) {
        return await this.service.updateOrCreateData(dto, files);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
