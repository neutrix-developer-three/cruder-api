import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { AboutUsCmsSchema } from './schema/about-us-cms.schema';
import { AboutUsCmsController } from './about-us-cms.controller';
import { AboutUsCmsService } from './about-us-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'about_us_cms', schema: AboutUsCmsSchema }
        ])
    ],
    controllers: [AboutUsCmsController],
    providers: [AboutUsCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class AboutUsCmsModule {}
