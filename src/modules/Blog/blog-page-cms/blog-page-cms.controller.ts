import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { BlogPageCmsService } from './blog-page-cms.service';
import { UpdateBlogPageCmsDto } from './dto/update-blog-page-cms.dto';

@Controller({ path: "blog-page-cms", version: Constants.API_VERSION_1 })
export class BlogPageCmsController {
    constructor(private readonly service: BlogPageCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'blog-page-cms' })
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileFieldsInterceptor(
        [
            { name: "banner_image", maxCount: 1 },
        ]
    ))
    async updateOrCreateData(@Body() dto: UpdateBlogPageCmsDto,
    @UploadedFiles() files: {
        banner_image?: UploadedMulterFileI,
    }) {
        return await this.service.updateOrCreateData(dto, files);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
