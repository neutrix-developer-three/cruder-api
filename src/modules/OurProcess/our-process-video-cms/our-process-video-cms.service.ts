import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { OurProcessVideoCmsRepository } from './our-process-video-cms-repository';
import { UpdateOurProcessVideoCmsDto } from './dto/update-our-process-video-cms.dto';
import { OurProcessVideoCms } from './schema/our-process-video-cms.schema';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class OurProcessVideoCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        @InjectModel('our_process_video_cms')
        private readonly ourProcessVideoCmsModel: Model<OurProcessVideoCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly ourProcessVideoCmsRepository = new OurProcessVideoCmsRepository(
        this.ourProcessVideoCmsModel
    );

    async updateOrCreateData(
        dto: UpdateOurProcessVideoCmsDto,
        files: {
            image?: UploadedMulterFileI,
        }
    ): Promise<OurProcessVideoCms | Error> {
        if (files && files.image) {     
            const image: any = await this.doSpaceService.uploadFile(files.image[0], "OurProcessVideoCms/");
            dto.image = image;
        }
        const isExists = await this.ourProcessVideoCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.ourProcessVideoCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Our process video cms added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.ourProcessVideoCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Our process video cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<OurProcessVideoCms | Error> {
        const data = await this.ourProcessVideoCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
