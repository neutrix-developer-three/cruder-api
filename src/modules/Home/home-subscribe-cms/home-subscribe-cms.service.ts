import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { HomeSubscribeCmsRepository } from './home-subscribe-cms-repository';
import { HomeSubscribeCms } from './schema/home-subscribe-cms.schema';
import { UpdateHomeSubscribeCmsDto } from './dto/update-home-subscribe-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class HomeSubscribeCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        @InjectModel('home_subscribe_cms')
        private readonly homeSubscribeCmsModel: Model<HomeSubscribeCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly homeSubscribeCmsRepository = new HomeSubscribeCmsRepository(
        this.homeSubscribeCmsModel
    );

    async updateOrCreateData(
        dto: UpdateHomeSubscribeCmsDto,
        files: {
            image?: UploadedMulterFileI
        }
    ): Promise<HomeSubscribeCms | Error> {
        if(files && files.image){
            const image: any = await this.doSpaceService.uploadFile(files.image[0], "HomeSubscribeCms/");
            dto.image = image;
        }
        const isExists = await this.homeSubscribeCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.homeSubscribeCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Home subscribe cms added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.homeSubscribeCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Home subscribe cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<HomeSubscribeCms | Error> {
        const data = await this.homeSubscribeCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
