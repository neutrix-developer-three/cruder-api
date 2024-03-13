import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { OurProcessVideoCmsController } from './our-process-video-cms.controller';
import { OurProcessVideoCmsService } from './our-process-video-cms.service';
import { OurProcessVideoCmsSchema } from './schema/our-process-video-cms.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'our_process_video_cms', schema: OurProcessVideoCmsSchema }
        ])
    ],
    controllers: [OurProcessVideoCmsController],
    providers: [OurProcessVideoCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class OurProcessVideoCmsModule {}
