import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { HomeSubscribeCmsService } from './home-subscribe-cms.service';
import { UpdateHomeSubscribeCmsDto } from './dto/update-home-subscribe-cms.dto';

@Controller({ path: "home-subscribe-cms", version: Constants.API_VERSION_1 })
export class HomeSubscribeCmsController {
    constructor(private readonly service: HomeSubscribeCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'home-subscribe-cms' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 }
        ]
    ))
    async updateOrCreateData(@Body() dto: UpdateHomeSubscribeCmsDto,
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
