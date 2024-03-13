import {Injectable} from '@nestjs/common';
// import sharp from 'sharp';
import {ImageUtils} from '../../utils/image.utils';
import {UpdateFileUploadDto} from './dto/update-file-upload.dto';


@Injectable()
export class FileUploadsService {


    async saveFile(file: Express.Multer.File, sizes: number[]): Promise<string> {
        if (sizes.length === 0) {
            const data = await ImageUtils.defualtSize(
                file
            );

            return data;
        } else {
            const data = await ImageUtils.resize(
                file,
                sizes[0],
                sizes[1]
            );

            return data;
        }


        // return ResponseUtils.buildData(
        //     data
        // );
    }

    async saveFiles(file: Express.Multer.File, sizes: number[]): Promise<string> {
        if (sizes.length == 0) {
            const data = await ImageUtils.defualtSize(
                file
            );

            return data;
        } else {
            const data = await ImageUtils.resize(
                file,
                sizes[0],
                sizes[1]
            );

            return data;
        }


        // return ResponseUtils.buildData(
        //     data
        // );
    }

    findAll() {
        return `This action returns all fileUploads`;
    }

    findOne(id: number) {
        return `This action returns a #${id} fileUpload`;
    }

    update(id: number, updateFileUploadDto: UpdateFileUploadDto) {
        return `This action updates a #${id} fileUpload`;
    }

    remove(id: number) {
        return `This action removes a #${id} fileUpload`;
    }
}
