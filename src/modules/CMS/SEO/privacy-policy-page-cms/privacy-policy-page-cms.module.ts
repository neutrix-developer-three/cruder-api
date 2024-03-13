import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrivacyPolicyPageCmsSchema } from './schema/privacy-policy-page-cms.schema';
import { PrivacyPolicyPageCmsController } from './privacy-policy-page-cms.controller';
import { PrivacyPolicyPageCmsService } from './privacy-policy-page-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'seo_privacy_policy_page_cms', schema: PrivacyPolicyPageCmsSchema }
        ])
    ],
    controllers: [PrivacyPolicyPageCmsController],
    providers: [PrivacyPolicyPageCmsService]
})
export class PrivacyPolicyPageCmsModule {}
