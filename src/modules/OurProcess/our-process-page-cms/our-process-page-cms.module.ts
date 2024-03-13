import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { OurProcessPageCmsSchema } from './schema/our-process-page-cms.schema';
import { OurProcessPageCmsController } from './our-process-page-cms.controller';
import { OurProcessPageCmsService } from './our-process-page-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'our_process_page_cms', schema: OurProcessPageCmsSchema }
        ])
    ],
    controllers: [OurProcessPageCmsController],
    providers: [OurProcessPageCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class OurProcessPageCmsModule {}
