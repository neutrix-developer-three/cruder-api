import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { HomePageCmsRepository } from './home-page-cms-repository';
import { HomePageCms } from './schema/home-page-cms.schema';
import { UpdateHomePageCmsDto } from './dto/update-home-page-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class HomePageCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        @InjectModel('home_page_cms')
        private readonly homePageCmsModel: Model<HomePageCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly homePageCmsRepository = new HomePageCmsRepository(
        this.homePageCmsModel
    );

    async updateOrCreateData(
        dto: UpdateHomePageCmsDto,
        files: {
            testimonial_background_image?: UploadedMulterFileI
        }
    ): Promise<HomePageCms | Error> {
        if(files && files.testimonial_background_image){
            const testimonial_background_image: any = await this.doSpaceService.uploadFile(files.testimonial_background_image[0], "HomePageCms/");
            dto.testimonial_background_image = testimonial_background_image;
        }
        const isExists = await this.homePageCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.homePageCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('home page cms added');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.homePageCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('home page cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<HomePageCms | Error> {
        const data = await this.homePageCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
