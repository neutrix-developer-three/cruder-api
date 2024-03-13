import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { PopupModalPageSchema } from '../promotional-popup-cms/schema/popup-modal-page.schema';
import { NewsletterPopupCmsSchema } from './schema/newsletter-popup-cms.schema';
import { NewsletterPopupCmsService } from './newsletter-popup-cms.service';
import { NewsletterPopupCmsController } from './newsletter-popup-cms.controller';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'newsletter_popup_cms', schema: NewsletterPopupCmsSchema },
            { name: 'promotional_popup_page', schema: PopupModalPageSchema }
        ])
    ],
    controllers: [NewsletterPopupCmsController],
    providers: [NewsletterPopupCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class NewsletterPopupCmsModule {}
