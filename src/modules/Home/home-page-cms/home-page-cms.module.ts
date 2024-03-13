import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { HomePageCmsSchema } from './schema/home-page-cms.schema';
import { HomePageCmsController } from './home-page-cms.controller';
import { HomePageCmsService } from './home-page-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'home_page_cms', schema: HomePageCmsSchema }
        ])
    ],
    controllers: [HomePageCmsController],
    providers: [HomePageCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class HomePageCmsModule {}
