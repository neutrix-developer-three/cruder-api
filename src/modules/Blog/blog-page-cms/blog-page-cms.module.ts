import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { BlogPageCmsSchema } from './schema/blog-page-cms.schema';
import { BlogPageCmsController } from './blog-page-cms.controller';
import { BlogPageCmsService } from './blog-page-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'blog_page_cms', schema: BlogPageCmsSchema }
        ])
    ],
    controllers: [BlogPageCmsController],
    providers: [BlogPageCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class BlogPageCmsModule {}
