import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { HomeEchoCmsRepository } from './home-echo-cms-repository';
import { HomeEchoCms } from './schema/home-echo-cms.schema';
import { UpdateHomeEchoCmsDto } from './dto/update-home-echo-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class HomeEchoCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        @InjectModel('home_echo_cms')
        private readonly homeEchoCmsModel: Model<HomeEchoCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly homeEchoCmsRepository = new HomeEchoCmsRepository(
        this.homeEchoCmsModel
    );

    async updateOrCreateData(
        dto: UpdateHomeEchoCmsDto,
        files: {
            image?: UploadedMulterFileI
        }
    ): Promise<HomeEchoCms | Error> {
        if(files && files.image){
            const image: any = await this.doSpaceService.uploadFile(files.image[0], "HomeEchoCms/");
            dto.image = image;
        }
        const isExists = await this.homeEchoCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.homeEchoCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Home echo cms added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.homeEchoCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Home echo cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<HomeEchoCms | Error> {
        const data = await this.homeEchoCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
