import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { OurProcessVideoCmsService } from './our-process-video-cms.service';
import { UpdateOurProcessVideoCmsDto } from './dto/update-our-process-video-cms.dto';

@Controller({ path: "our-process-video-cms", version: Constants.API_VERSION_1 })
export class OurProcessVideoCmsController {
    constructor(private readonly service: OurProcessVideoCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'our-process-video-cms' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 },
        ]
    ))
    async updateOrCreateData(@Body() dto: UpdateOurProcessVideoCmsDto,
    @UploadedFiles() files: {
        image?: UploadedMulterFileI,
    }) {
        return await this.service.updateOrCreateData(dto, files);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
