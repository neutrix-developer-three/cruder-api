import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from 'src/modules/Blog/blog/schema/blog.schema';
import { BlogMetaCmsSchema } from './schema/blog-meta-cms.schema';
import { BlogMetaCmsController } from './blog-meta-cms.controller';
import { BlogMetaCmsService } from './blog-meta-cms.service';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'blog_meta_cms', schema: BlogMetaCmsSchema },
            { name: 'blogs', schema: BlogSchema }
        ])
    ],
    controllers: [BlogMetaCmsController],
    providers: [BlogMetaCmsService]
})
export class BlogMetaCmsModule {}
