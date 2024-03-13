import { Module } from '@nestjs/common';
import { LogActivityController } from './log-activity.controller';
import { LogActivityService } from './log-activity.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LogActivitySchema } from './schema/log-activity.schema';

@Module({
    imports: [MongooseModule.forFeature([
        { name: 'log_activities', schema: LogActivitySchema }
    ])],
    controllers: [LogActivityController],
    providers: [LogActivityService]
})

export class LogActivityModule { }
