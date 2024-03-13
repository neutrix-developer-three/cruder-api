import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { TermsConditionsCms } from './schema/terms-conditions-cms.schema';
import { TermsConditionsCmsRepository } from './terms-conditions-cms-repository';
import { UpdateTermsConditionsCmsDto } from './dto/update-terms-conditions-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class TermsConditionsCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        @InjectModel('terms_conditions_cms')
        private readonly termsConditionsCmsModel: Model<TermsConditionsCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly termsConditionsCmsRepository = new TermsConditionsCmsRepository(
        this.termsConditionsCmsModel
    );

    async updateOrCreateData(
        dto: UpdateTermsConditionsCmsDto,
        files: {
            banner_image?: UploadedMulterFileI
        }
    ): Promise<TermsConditionsCms | Error> {
        if (files && files.banner_image) {
            const bannerImage: any = await this.doSpaceService.uploadFile(files.banner_image[0], "TermsConditionsCms/");
            dto.banner_image = bannerImage;
        }
        const isExists = await this.termsConditionsCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.termsConditionsCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('terms conditions cms added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.termsConditionsCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('terms conditions cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<TermsConditionsCms | Error> {
        const data = await this.termsConditionsCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }

}
