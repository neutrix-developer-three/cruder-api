import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FaqMetaCmsSchema } from './schema/faq-meta-cms.schema';
import { FaqMetaCmsController } from './faq-meta-cms.controller';
import { FaqMetaCmsService } from './faq-meta-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'seo_faq_meta_cms', schema: FaqMetaCmsSchema }
        ])
    ],
    controllers: [FaqMetaCmsController],
    providers: [FaqMetaCmsService]
})
export class FaqMetaCmsModule {}
