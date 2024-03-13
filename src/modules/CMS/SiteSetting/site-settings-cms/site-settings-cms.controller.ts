import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { SiteSettingsCmsService } from './site-settings-cms.service';
import { UpdateSiteSettingsCmDto } from './dto/update-site-settings-cms.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';

@Controller({ path: "site-settings-cms", version: Constants.API_VERSION_1 })
export class SiteSettingsCmsController {
    constructor(private readonly service: SiteSettingsCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'site-settings-cms' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "logo", maxCount: 1 },
            { name: "login_background", maxCount: 1 }
        ]
    ))
    async updateOrCreateData(@Body() dto: UpdateSiteSettingsCmDto,
    @UploadedFiles() files: {
        logo?: UploadedMulterFileI,
        login_background?:UploadedMulterFileI
    }) {
        return await this.service.updateOrCreateData(dto, files);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
