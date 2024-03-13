import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPageComponentUiCmsSchema } from './schema/blog-page-component-ui-cms.schema';
import { BlogPageComponentUiCmsController } from './blog-page-component-ui-cms.controller';
import { BlogPageComponentUiCmsService } from './blog-page-component-ui-cms.service';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'blog_page_component_ui_cms', schema: BlogPageComponentUiCmsSchema }
        ])
    ],
    controllers: [BlogPageComponentUiCmsController],
    providers: [BlogPageComponentUiCmsService]
})
export class BlogPageComponentUiCmsModule {}
