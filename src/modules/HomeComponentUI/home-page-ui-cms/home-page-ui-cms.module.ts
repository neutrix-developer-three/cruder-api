import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomePageUiCmsSchema } from './schema/home-page-ui-cms.schema';
import { HomePageUiCmsController } from './home-page-ui-cms.controller';
import { HomePageUiCmsService } from './home-page-ui-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'home_page_ui_cms', schema: HomePageUiCmsSchema }
        ])
    ],
    controllers: [HomePageUiCmsController],
    providers: [HomePageUiCmsService]
})
export class HomePageUiCmsModule {}
