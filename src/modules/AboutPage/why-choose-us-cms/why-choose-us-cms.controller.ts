import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { WhyChooseUsCmsService } from './why-choose-us-cms.service';
import { UpdateWhyChooseUsCmsDto } from './dto/update-why-choose-us-cms.dto';

@Controller({ path: "about-why-choose-us-cms", version: Constants.API_VERSION_1 })
export class WhyChooseUsCmsController {
    constructor(private readonly service: WhyChooseUsCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'about-why-choose-us-cms' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "image", maxCount: 1 },
        ]
    ))
    async updateOrCreateData(@Body() dto: UpdateWhyChooseUsCmsDto,
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
