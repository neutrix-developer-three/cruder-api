import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { PromotionalPopupCmsService } from './promotional-popup-cms.service';
import { UpdatePromotionalPopupCmsDto } from './dto/update-promotional-popup-cms.dto';

@Controller({ path: "promotional-popup-cms", version: Constants.API_VERSION_1 })
export class PromotionalPopupCmsController {
    constructor(private readonly service: PromotionalPopupCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'promotional-popup-cms' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 },
            { name: "logo", maxCount: 1 },
        ]
    ))
    async updateOrCreateData(@Body() dto: UpdatePromotionalPopupCmsDto,
    @UploadedFiles() files: {
        image?: UploadedMulterFileI,
        logo?: UploadedMulterFileI
    }) {
        return await this.service.updateOrCreateData(dto, files);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }

    @Get('/form-data')
    @StaticRoutesProps({ routeName: 'promotional-popup-cms' })
    @UseGuards(AdminAuthGuard)
    formData() {
        return this.service.formData();
    }
}
