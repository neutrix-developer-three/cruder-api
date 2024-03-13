import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { PromotionalPopupCmsSchema } from './schema/promotional-popup-cms.schema';
import { PromotionalPopupCmsController } from './promotional-popup-cms.controller';
import { PromotionalPopupCmsService } from './promotional-popup-cms.service';
import { PopupModalPageSchema } from './schema/popup-modal-page.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'promotional_popup_cms', schema: PromotionalPopupCmsSchema },
            { name: 'promotional_popup_page', schema: PopupModalPageSchema }
        ])
    ],
    controllers: [PromotionalPopupCmsController],
    providers: [PromotionalPopupCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class PromotionalPopupCmsModule {}
