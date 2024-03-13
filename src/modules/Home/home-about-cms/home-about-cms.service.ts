import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { HomeAboutCmsRepository } from './home-about-cms-repository';
import { HomeAboutCms } from './schema/home-about-cms.schema';
import { UpdateHomeAboutCmsDto } from './dto/update-home-about-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class HomeAboutCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        @InjectModel('home_about_cms')
        private readonly homeAboutCmsModel: Model<HomeAboutCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly homeAboutCmsRepository = new HomeAboutCmsRepository(
        this.homeAboutCmsModel
    );

    async updateOrCreateData(
        dto: UpdateHomeAboutCmsDto,
        files: {
            image?: UploadedMulterFileI,
            about_info_icon_one?: UploadedMulterFileI,
            about_info_icon_two?: UploadedMulterFileI
        }
    ): Promise<HomeAboutCms | Error> {
        if(files){
            if(files.image){
                const image: any = await this.doSpaceService.uploadFile(files.image[0], "HomeAboutCms/");
                dto.image = image;
            }
            if(files.about_info_icon_one){
                const about_info_icon_one: any = await this.doSpaceService.uploadFile(files.about_info_icon_one[0], "HomeAboutCms/");
                dto.about_info_icon_one = about_info_icon_one;
            }
            if(files.about_info_icon_two){
                const about_info_icon_two: any = await this.doSpaceService.uploadFile(files.about_info_icon_two[0], "HomeAboutCms/");
                dto.about_info_icon_two = about_info_icon_two;
            }
        }
        const isExists = await this.homeAboutCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.homeAboutCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Home about cms added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.homeAboutCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Home about cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<HomeAboutCms | Error> {
        const data = await this.homeAboutCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
