import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { ContactUsCmsSchema } from './schema/contact-us-cms.schema';
import { ContactUsCmsController } from './contact-us-cms.controller';
import { ContactUsCmsService } from './contact-us-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'contact_us_cms', schema: ContactUsCmsSchema }
        ])
    ],
    controllers: [ContactUsCmsController],
    providers: [ContactUsCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class ContactUsCmsModule {}
