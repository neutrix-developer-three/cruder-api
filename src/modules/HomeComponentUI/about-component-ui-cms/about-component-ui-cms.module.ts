import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutComponentUiCmsSchema } from './schema/about-component-ui-cms.schema';
import { AboutComponentUiCmsController } from './about-component-ui-cms.controller';
import { AboutComponentUiCmsService } from './about-component-ui-cms.service';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'about_component_ui_cms', schema: AboutComponentUiCmsSchema }
        ])
    ],
    controllers: [AboutComponentUiCmsController],
    providers: [AboutComponentUiCmsService]
})
export class AboutComponentUiCmsModule {}
