import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { HomeAboutCmsSchema } from './schema/home-about-cms.schema';
import { HomeAboutCmsController } from './home-about-cms.controller';
import { HomeAboutCmsService } from './home-about-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'home_about_cms', schema: HomeAboutCmsSchema }
        ])
    ],
    controllers: [HomeAboutCmsController],
    providers: [HomeAboutCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class HomeAboutCmsModule {}
