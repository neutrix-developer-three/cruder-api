import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactPageComponentUiCmsSchema } from './schema/contact-page-component-ui-cms.schema';
import { ContactPageComponentUiCmsController } from './contact-page-component-ui-cms.controller';
import { ContactPageComponentUiCmsService } from './contact-page-component-ui-cms.service';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'contact_page_component_ui_cms', schema: ContactPageComponentUiCmsSchema }
        ])
    ],
    controllers: [ContactPageComponentUiCmsController],
    providers: [ContactPageComponentUiCmsService]
})
export class ContactPageComponentUiCmsModule {}
