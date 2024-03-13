import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscribePageComponentUiCmsSchema } from './schema/subscribe-page-component-ui-cms.schema';
import { SubscribePageComponentUiCmsController } from './subscribe-page-component-ui-cms.controller';
import { SubscribePageComponentUiCmsService } from './subscribe-page-component-ui-cms.service';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'subscribe_page_component_ui_cms', schema: SubscribePageComponentUiCmsSchema }
        ])
    ],
    controllers: [SubscribePageComponentUiCmsController],
    providers: [SubscribePageComponentUiCmsService]
})
export class SubscribePageComponentUiCmsModule {}
