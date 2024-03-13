import {diskStorage} from "multer";
import {extname} from "path";
import { nanoid } from 'nanoid';



export function getMulterConfig(
    path: string
) {
    return {
        storage: diskStorage({
            destination: (req, file, cb) => {
                cb(null, path);
            },
            filename: (req, file, cb) => {

                cb(null, nanoid() + `${file.originalname}`)
            }
        }),
        fileFilter: (req, file, cb) => {
            const ext = extname(file.originalname);
            // if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            //     return cb(new HttpException('Only images are allowed!', HttpStatus.BAD_REQUEST), null);
            // }
            cb(null, true);
        },
        limits: {fileSize: 1024 * 1024}
    }
}