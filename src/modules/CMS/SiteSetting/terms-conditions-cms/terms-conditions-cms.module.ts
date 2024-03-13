import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { TermsConditionsCmsSchema } from './schema/terms-conditions-cms.schema';
import { TermsConditionsCmsController } from './terms-conditions-cms.controller';
import { TermsConditionsCmsService } from './terms-conditions-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'terms_conditions_cms', schema: TermsConditionsCmsSchema }
        ])
    ],
    controllers: [TermsConditionsCmsController],
    providers: [TermsConditionsCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class TermsConditionsCmsModule {}
