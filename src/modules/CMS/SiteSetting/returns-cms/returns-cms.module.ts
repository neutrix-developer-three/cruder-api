import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from 'src/modules/SpacesModule/SpacesService';
import { ReturnsCmsService } from './returns-cms.service';
import { ReturnsCmsController } from './returns-cms.controller';
import { ReturnsCmsSchema } from './schema/returns-cms.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'returns_cms', schema: ReturnsCmsSchema }
        ])
    ],
    controllers: [ReturnsCmsController],
    providers: [ReturnsCmsService,DoSpacesService, DoSpacesServicerovider]
})
export class ReturnsCmsModule {}
