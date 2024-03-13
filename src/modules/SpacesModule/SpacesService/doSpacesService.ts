// doSpacesService.ts
import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import axios from 'axios';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { DoSpacesServiceLib, UploadedMulterFileI } from '.';

// Typical nestJs service
@Injectable()
export class DoSpacesService {
    constructor(@Inject(DoSpacesServiceLib) private readonly s3: AWS.S3) {
    }

    async uploadFile(file: UploadedMulterFileI, uploadLocation?: string) {
        // Precaution to avoid having 2 files with the same name
        const extension = extname(file.originalname);
        let fileName = `chill-medicated.${uuidv4()}_do${extension}`;
        if (uploadLocation) {
            fileName = uploadLocation + fileName;
        }

        // Return a promise that resolves only when the file upload is complete
        return new Promise((resolve, reject) => {
            this.s3.putObject(
                {
                    Bucket: 'chill-medicated',
                    Key: fileName,
                    Body: file.buffer,
                    ACL: 'public-read',
                    ContentType: file.mimetype
                },
                (error: AWS.AWSError) => {
                    if (!error) {
                        resolve(`https://chill-medicated.nyc3.digitaloceanspaces.com/${fileName}`);
                    } else {
                        reject(
                            new Error(
                                `DoSpacesService_ERROR: ${error.message || 'Something went wrong'}`,
                            ),
                        );
                    }
                },
            );
        });
    }

    async uploadFileBuffer(file: any, extension: any, uploadLocation?: string) {
        // Precaution to avoid having 2 files with the same name
        let fileName = `chill-medicated.${uuidv4()}_do.${extension}`;
        if (uploadLocation) {
            fileName = uploadLocation + fileName;
        }

        // Return a promise that resolves only when the file upload is complete
        return new Promise((resolve, reject) => {
            this.s3.putObject(
                {
                    Bucket: 'chill-medicated',
                    Key: fileName,
                    Body: file,
                    ACL: 'public-read',
                },
                (error: AWS.AWSError) => {
                    if (!error) {
                        resolve(`https://chill-medicated.nyc3.digitaloceanspaces.com/${fileName}`);
                    } else {
                        reject(
                            new Error(
                                `DoSpacesService_ERROR: ${error.message || 'Something went wrong'}`,
                            ),
                        );
                    }
                },
            );
        });
    }

    async uploadImageFromURL(imageUrl: string, uploadLocation?: string) {
        const response: any = await axios.get(imageUrl, {
            responseType: "stream"
        });
        if (response.status === 200) {
            const extension = ".png";
            let fileName = `chill-medicated.${uuidv4()}_do${extension}`;
            if (uploadLocation) {
                fileName = uploadLocation + fileName;
            }

            const uploadParams = {
                Bucket: "chill-medicated",
                Key: fileName,
                Body: response.data,
                ACL: "public-read"
            };

            const uploadResult = await this.s3.upload(uploadParams).promise();

            return `https://chill-medicated.nyc3.digitaloceanspaces.com/${fileName}`;
        }
    }
}