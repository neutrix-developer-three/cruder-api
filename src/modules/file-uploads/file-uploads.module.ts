import {Module} from '@nestjs/common';
import {MulterModule} from '@nestjs/platform-express';
import {FileUploadsController} from './file-uploads.controller';
import {FileUploadsService} from './file-uploads.service';

@Module({
    imports: [
        MulterModule.register({
            dest: process.env.IMAGE_FOLDER,
        }),
    ],
    controllers: [FileUploadsController],
    providers: [FileUploadsService]
})
export class FileUploadsModule {
}
