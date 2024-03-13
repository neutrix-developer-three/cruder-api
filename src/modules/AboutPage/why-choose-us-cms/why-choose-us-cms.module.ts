import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { WhyChooseUsCmsSchema } from './schema/why-choose-us-cms.schema';
import { WhyChooseUsCmsController } from './why-choose-us-cms.controller';
import { WhyChooseUsCmsService } from './why-choose-us-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'about_why_choose_us_cms', schema: WhyChooseUsCmsSchema }
        ])
    ],
    controllers: [WhyChooseUsCmsController],
    providers: [WhyChooseUsCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class WhyChooseUsCmsModule {}
