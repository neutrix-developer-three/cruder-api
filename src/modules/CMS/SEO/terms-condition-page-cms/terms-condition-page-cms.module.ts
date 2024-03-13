import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TermsConditionPageCmsSchema } from './schema/terms-condition-page-cms.schema';
import { TermsConditionPageCmsController } from './terms-condition-page-cms.controller';
import { TermsConditionPageCmsService } from './terms-condition-page-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'seo_terms_condition_page_cms', schema: TermsConditionPageCmsSchema }
        ])
    ],
    controllers: [TermsConditionPageCmsController],
    providers: [TermsConditionPageCmsService]
})
export class TermsConditionPageCmsModule {}
