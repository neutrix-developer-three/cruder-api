import { Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { BlogPageComponentUiCmsService } from './blog-page-component-ui-cms.service';
import { UpdateBlogPageComponentUiCmsDto } from './dto/update-blog-page-component-ui-cms.dto';

@Controller({ path: "blog-page-component-ui-cms", version: Constants.API_VERSION_1 })
export class BlogPageComponentUiCmsController {
    constructor(private readonly service: BlogPageComponentUiCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'blog-page-component-ui-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Body() dto: UpdateBlogPageComponentUiCmsDto) {
        return await this.service.updateOrCreateData(dto);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
