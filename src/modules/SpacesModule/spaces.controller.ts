import {FileInterceptor} from '@nestjs/platform-express';
import {DoSpacesService} from './SpacesService/doSpacesService';
import {UploadedMulterFileI} from './SpacesService';
import {Controller, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {Constants} from 'src/utils/constants';

// just a typical nestJs controller
@Controller({path: 'do', version: Constants.API_VERSION_1})
export class SpacesController {
    constructor(
        private readonly doSpacesService: DoSpacesService,
    ) {
    }

    @UseInterceptors(FileInterceptor('file'))
    @Post('spaces')
    async uploadFile(@UploadedFile() file: UploadedMulterFileI) {
        const url = await this.doSpacesService.uploadFile(file, "dd/");

        return {
            url,
        };
    }
}