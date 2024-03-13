import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OurProcessComponentUiCmsSchema } from './schema/our-process-component-ui-cms.schema';
import { OurProcessComponentUiCmsController } from './our-process-component-ui-cms.controller';
import { OurProcessComponentUiCmsService } from './our-process-component-ui-cms.service';



@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'our_process_component_ui_cms', schema: OurProcessComponentUiCmsSchema }
        ])
    ],
    controllers: [OurProcessComponentUiCmsController],
    providers: [OurProcessComponentUiCmsService]
})
export class OurProcessComponentUiCmsModule {}
