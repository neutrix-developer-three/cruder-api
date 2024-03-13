import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReturnPageCmsSchema } from './schema/return-page-cms.schema';
import { ReturnPageCmsController } from './return-page-cms.controller';
import { ReturnPageCmsService } from './return-page-cms.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'seo_return_page_cms', schema: ReturnPageCmsSchema }
        ])
    ],
    controllers: [ReturnPageCmsController],
    providers: [ReturnPageCmsService]
})
export class ReturnPageCmsModule {}
