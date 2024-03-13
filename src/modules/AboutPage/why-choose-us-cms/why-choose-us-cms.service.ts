import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { WhyChooseUsCms } from './schema/why-choose-us-cms.schema';
import { WhyChooseUsCmsRepository } from './why-choose-us-cms-repository';
import { UpdateWhyChooseUsCmsDto } from './dto/update-why-choose-us-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class WhyChooseUsCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        private readonly logService: LogActivityService,
        @InjectModel('about_why_choose_us_cms')
        private readonly whyChooseUsCmsModel: Model<WhyChooseUsCms>
    ) { }

    private readonly whyChooseUsCmsRepository = new WhyChooseUsCmsRepository(
        this.whyChooseUsCmsModel
    );

    async updateOrCreateData(
        dto: UpdateWhyChooseUsCmsDto,
        files: {
            image?: UploadedMulterFileI,
        }
    ): Promise<WhyChooseUsCms | Error> {
        if (files) {
            if(files.image){
                const image: any = await this.doSpaceService.uploadFile(files.image[0], "WhyChooseUsCmsCMS/");
                dto.image = image;
            }
        }
        const isExists = await this.whyChooseUsCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.whyChooseUsCmsRepository.createEntity(dto);
            await this.logService.createLog('About choose us added.');
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
            const data = await this.whyChooseUsCmsRepository.updateEntity(id, dto);
            await this.logService.createLog('About choose us updated.');
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

    async findOneEntity(): Promise<WhyChooseUsCms | Error> {
        const data = await this.whyChooseUsCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
