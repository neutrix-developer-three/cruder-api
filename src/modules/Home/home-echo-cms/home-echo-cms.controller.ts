import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { HomeEchoCmsService } from './home-echo-cms.service';
import { UpdateHomeEchoCmsDto } from './dto/update-home-echo-cms.dto';

@Controller({ path: "home-echo-cms", version: Constants.API_VERSION_1 })
export class HomeEchoCmsController {
    constructor(private readonly service: HomeEchoCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'home-echo-cms' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 }
        ]
    ))
    async updateOrCreateData(@Body() dto: UpdateHomeEchoCmsDto,
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
