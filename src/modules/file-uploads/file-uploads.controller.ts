import {Controller, Post, UploadedFile, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {FileUploadsService} from './file-uploads.service';
import {Constants} from '../../utils/constants';
import {FileInterceptor} from '@nestjs/platform-express';
import {getMulterConfig} from '../../core/multer.config';

@Controller({
    path: 'file-uploads',
    version: Constants.API_VERSION_1
})
export class FileUploadsController {
    constructor(
        private readonly fileUploadsService: FileUploadsService
    ) {
    }

    @Post()
    @UseInterceptors(
        FileInterceptor(
            'file',
            getMulterConfig(
                './uploads'
            )
            /* getMulterConfig(
                process.env.IMAGE_FOLDER
            ) */
        )
    )
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.fileUploadsService.saveFile(
            file, []
        );
    }

    @Post('multi')
    @UseInterceptors(
        FileInterceptor(
            'files',
            getMulterConfig(
                './uploads'
            )
        )
    )
    uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
       
    }
}
