import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SiteSettingsCmsSchema } from './schema/site-settings-cms.schema';
import { SiteSettingsCmsController } from './site-settings-cms.controller';
import { SiteSettingsCmsService } from './site-settings-cms.service';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'site_settings_cms', schema: SiteSettingsCmsSchema }
        ])
    ],
    controllers: [SiteSettingsCmsController],
    providers: [SiteSettingsCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class SiteSettingsCmsModule {}
