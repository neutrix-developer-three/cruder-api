import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { AboutUsPageCms } from './schema/about-us-page-cms.schema';
import { AboutUsPageCmsRepository } from './about-us-page-cms-repository';
import { UpdateAboutUsPageCmsDto } from './dto/update-about-us-page-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class AboutUsPageCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        private readonly logService: LogActivityService,
        @InjectModel('about_us_page_cms')
        private readonly aboutUsPageCmsModel: Model<AboutUsPageCms>
    ) { }

    private readonly aboutUsPageCmsRepository = new AboutUsPageCmsRepository(
        this.aboutUsPageCmsModel
    );

    async updateOrCreateData(
        dto: UpdateAboutUsPageCmsDto,
        files: {
            banner_image?: UploadedMulterFileI
        }
    ): Promise<AboutUsPageCms | Error> {
        if (files && files.banner_image ) {          
            const banner_image: any = await this.doSpaceService.uploadFile(files.banner_image[0], "AboutUsPageCms/");
            dto.banner_image = banner_image;          
        }
        const isExists = await this.aboutUsPageCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.aboutUsPageCmsRepository.createEntity(dto);
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
            const data = await this.aboutUsPageCmsRepository.updateEntity(id, dto);
            await this.logService.createLog('About Us Page CMS updated.');
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

    async findOneEntity(): Promise<AboutUsPageCms | Error> {
        const data = await this.aboutUsPageCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
