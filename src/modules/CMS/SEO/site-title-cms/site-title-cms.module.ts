import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SiteTitleCmsSchema } from './schema/site-title-cms.schema';
import { SiteTitleCmsController } from './site-title-cms.controller';
import { SiteTitleCmsService } from './site-title-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'seo_site_title_cms', schema: SiteTitleCmsSchema }
        ])
    ],
    controllers: [SiteTitleCmsController],
    providers: [SiteTitleCmsService]
})
export class SiteTitleCmsModule {}
