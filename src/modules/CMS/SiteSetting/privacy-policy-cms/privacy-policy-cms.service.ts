import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { PrivacyPolicyCmsRepository } from './privacy-policy-cms-repository';
import { PrivacyPolicyCms } from './schema/privacy-policy-cms.schema';
import { UpdatePrivacyPolicyCmsDto } from './dto/update-privacy-policy-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class PrivacyPolicyCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        @InjectModel('privacy_policy_cms')
        private readonly privacyPolicyCmsModel: Model<PrivacyPolicyCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly privacyPolicyCmsRepository = new PrivacyPolicyCmsRepository(
        this.privacyPolicyCmsModel
    );

    async updateOrCreateData(
        dto: UpdatePrivacyPolicyCmsDto,
        files: {
            banner_image?: UploadedMulterFileI
        }
    ): Promise<PrivacyPolicyCms | Error> {
        if (files && files.banner_image) {
            const bannerImage: any = await this.doSpaceService.uploadFile(files.banner_image[0], "PrivacyPolicyCMS/");
            dto.banner_image = bannerImage;
        }
        const isExists = await this.privacyPolicyCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.privacyPolicyCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Privacy policy cms added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.privacyPolicyCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Privacy policy cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<PrivacyPolicyCms | Error> {
        const data = await this.privacyPolicyCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
