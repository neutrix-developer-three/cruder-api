import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { PrivacyPolicyCmsController } from './privacy-policy-cms.controller';
import { PrivacyPolicyCmsService } from './privacy-policy-cms.service';
import { PrivacyPolicyCmsSchema } from './schema/privacy-policy-cms.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'privacy_policy_cms', schema: PrivacyPolicyCmsSchema }
        ])
    ],
    controllers: [PrivacyPolicyCmsController],
    providers: [PrivacyPolicyCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class PrivacyPolicyCmsModule {}
