import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { ReturnsCmsRepository } from './returns-cms-repository';
import { ReturnsCms } from './schema/returns-cms.schema';
import { UpdateReturnsCmsDto } from './dto/update-returns-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';


@Injectable()
export class ReturnsCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        @InjectModel('returns_cms')
        private readonly returnsCmsModel: Model<ReturnsCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly returnsCmsRepository = new ReturnsCmsRepository(
        this.returnsCmsModel
    );

    async updateOrCreateData(
        dto: UpdateReturnsCmsDto,
        files: {
            banner_image?: UploadedMulterFileI
        }
    ): Promise<ReturnsCms | Error> {
        if (files && files.banner_image) {
            const bannerImage: any = await this.doSpaceService.uploadFile(files.banner_image[0], "ReturnsCMS/");
            dto.banner_image = bannerImage;
        }
        const isExists = await this.returnsCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.returnsCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Returns cms added');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.returnsCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Returns cms updated');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<ReturnsCms | Error> {
        const data = await this.returnsCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
