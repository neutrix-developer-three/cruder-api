import * as fs from 'fs';
import { extname } from "path";
import * as sharp from "sharp";
import { v4 as uuidv4 } from 'uuid';

export class ImageUtils {

    static async resize(
        file: Express.Multer.File,
        width: number,
        height: number
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            const extension = extname(file.originalname);
            const newfilename = `platinum-landscape.${uuidv4()}_resized${extension}`;
            sharp(file.path)
                .resize(width, height)
                .toFile(
                    `${file.destination}/` + newfilename, function (err, info) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(newfilename);
                    });
        });
    }

    static async defualtSize(
        file: Express.Multer.File
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            const extension = extname(file.originalname);
            const newfilename = `platinum-landscape.${uuidv4()}_default${extension}`;

            fs.renameSync(file.path, `${file.destination}/` + newfilename);
            resolve(newfilename);
        });
    }
}
