import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { HeroSectionCmsService } from './hero-section-cms.service';
import { UpdateHeroSectionCmsDto } from './dto/update-hero-section-cms.dto';

@Controller({ path: "hero-section-cms", version: Constants.API_VERSION_1 })
export class HeroSectionCmsController {
    constructor(private readonly service: HeroSectionCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'hero-section-cms' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 }
        ]
    ))
    async updateOrCreateData(@Body() dto: UpdateHeroSectionCmsDto,
    @UploadedFiles() files: {
        image?: UploadedMulterFileI
    }) {
        return await this.service.updateOrCreateData(dto, files);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
