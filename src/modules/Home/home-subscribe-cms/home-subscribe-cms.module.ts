import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { HomeSubscribeCmsSchema } from './schema/home-subscribe-cms.schema';
import { HomeSubscribeCmsController } from './home-subscribe-cms.controller';
import { HomeSubscribeCmsService } from './home-subscribe-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'home_subscribe_cms', schema: HomeSubscribeCmsSchema }
        ])
    ],
    controllers: [HomeSubscribeCmsController],
    providers: [HomeSubscribeCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class HomeSubscribeCmsModule {}
