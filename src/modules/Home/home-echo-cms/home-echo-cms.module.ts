import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { HomeEchoCmsSchema } from './schema/home-echo-cms.schema';
import { HomeEchoCmsController } from './home-echo-cms.controller';
import { HomeEchoCmsService } from './home-echo-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'home_echo_cms', schema: HomeEchoCmsSchema }
        ])
    ],
    controllers: [HomeEchoCmsController],
    providers: [HomeEchoCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class HomeEchoCmsModule {}
