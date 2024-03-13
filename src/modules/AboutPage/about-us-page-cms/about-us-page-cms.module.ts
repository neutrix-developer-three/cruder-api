import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { AboutUsPageCmsSchema } from './schema/about-us-page-cms.schema';
import { AboutUsPageCmsController } from './about-us-page-cms.controller';
import { AboutUsPageCmsService } from './about-us-page-cms.service';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'about_us_page_cms', schema: AboutUsPageCmsSchema }
        ])
    ],
    controllers: [AboutUsPageCmsController],
    providers: [AboutUsPageCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class AboutUsPageCmsModule {}
