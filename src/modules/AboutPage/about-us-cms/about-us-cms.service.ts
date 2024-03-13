import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { AboutUsCms } from './schema/about-us-cms.schema';
import { AboutUsCmsRepository } from './about-us-cms-repository';
import { UpdateAboutUsCmsDto } from './dto/update-about-us-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class AboutUsCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        @InjectModel('about_us_cms')
        private readonly aboutUsCmsModel: Model<AboutUsCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly aboutUsCmsRepository = new AboutUsCmsRepository(
        this.aboutUsCmsModel
    );

    async updateOrCreateData(
        dto: UpdateAboutUsCmsDto,
        files: {
            image?: UploadedMulterFileI,
            about_item_icon_one?: UploadedMulterFileI,
            about_item_icon_two?: UploadedMulterFileI,
        }
    ): Promise<AboutUsCms | Error> {
        if (files) {
            if(files.image){
                const image: any = await this.doSpaceService.uploadFile(files.image[0], "AboutUsCMS/");
                dto.image = image;
            }
            if(files.about_item_icon_one){
                const about_item_icon_one: any = await this.doSpaceService.uploadFile(files.about_item_icon_one[0], "AboutUsCMS/");
                dto.about_item_icon_one = about_item_icon_one;
            }
            if(files.about_item_icon_two){
                const about_item_icon_two: any = await this.doSpaceService.uploadFile(files.about_item_icon_two[0], "AboutUsCMS/");
                dto.about_item_icon_two = about_item_icon_two;
            }
        }
        const isExists = await this.aboutUsCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.aboutUsCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.aboutUsCmsRepository.updateEntity(id, dto);
            await this.logService.createLog('About us updated.');
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<AboutUsCms | Error> {
        const data = await this.aboutUsCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
