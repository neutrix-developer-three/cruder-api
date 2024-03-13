import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { OurProcessPageCms } from './schema/our-process-page-cms.schema';
import { OurProcessPageCmsRepository } from './our-process-page-cms-repository';
import { UpdateOurProcessPageCmsDto } from './dto/update-our-process-page-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class OurProcessPageCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        @InjectModel('our_process_page_cms')
        private readonly ourProcessPageCmsModel: Model<OurProcessPageCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly ourProcessPageCmsRepository = new OurProcessPageCmsRepository(
        this.ourProcessPageCmsModel
    );

    async updateOrCreateData(
        dto: UpdateOurProcessPageCmsDto,
        files: {
            image?: UploadedMulterFileI,
            banner_image?: UploadedMulterFileI,
            section_two_image?: UploadedMulterFileI,
        }
    ): Promise<OurProcessPageCms | Error> {
        if (files) { 
            if(files.banner_image){
                const banner_image: any = await this.doSpaceService.uploadFile(files.banner_image[0], "OurProcessPageCms/");
                dto.banner_image = banner_image;
            }
            if(files.image){
                const image: any = await this.doSpaceService.uploadFile(files.image[0], "OurProcessPageCms/");
                dto.image = image;
            }
            if(files.section_two_image){
                const section_two_image: any = await this.doSpaceService.uploadFile(files.section_two_image[0], "OurProcessPageCms/");
                dto.section_two_image = section_two_image;
            }
        }
        const isExists = await this.ourProcessPageCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.ourProcessPageCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Our process page cms added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.ourProcessPageCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Our process page cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<OurProcessPageCms | Error> {
        const data = await this.ourProcessPageCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
