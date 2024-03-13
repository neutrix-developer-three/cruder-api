import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { FaqPageCmsController } from './faq-page-cms.controller';
import { FaqPageCmsService } from './faq-page-cms.service';
import { FaqPageCmsSchema } from './schema/faq-page-cms.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'faq_page_cms', schema: FaqPageCmsSchema }
        ])
    ],
    controllers: [FaqPageCmsController],
    providers: [FaqPageCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class FaqPageCmsModule {}
