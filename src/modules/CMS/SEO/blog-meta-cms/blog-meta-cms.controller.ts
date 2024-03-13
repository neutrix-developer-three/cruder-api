import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles, Patch, Param, Query } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { FilterDto } from 'src/core/filter.dto';
import { BlogMetaCmsService } from './blog-meta-cms.service';
import { UpdateBlogMetaCmsDto } from './dto/update-blog-meta-cms.dto';

@Controller({ path: "blog-meta-cms", version: Constants.API_VERSION_1 })
export class BlogMetaCmsController {
    constructor(private readonly service: BlogMetaCmsService) { }

    @Patch("/:blogId")
    @StaticRoutesProps({ routeName: 'blog-meta-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Param("blogId") blogId: string, @Body() dto: UpdateBlogMetaCmsDto) {
        return await this.service.updateOrCreateData(blogId, dto);
    }

    @Get()
    @UseGuards(AdminAuthGuard)
    async findAll(@Query() filterDto:FilterDto) {
        return await this.service.findAll(filterDto);
    }
}
