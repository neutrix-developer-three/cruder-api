import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { PrivacyPolicyPageCms } from './schema/privacy-policy-page-cms.schema';
import { PrivacyPolicyPageCmsRepository } from './privacy-policy-page-cms-repository';
import { UpdatePrivacyPolicyPageCmsDto } from './dto/update-privacy-policy-page-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class PrivacyPolicyPageCmsService {
    constructor(
        @InjectModel('seo_privacy_policy_page_cms')
        private readonly privacyPolicyPageCmsModel: Model<PrivacyPolicyPageCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly privacyPolicyPageCmsRepository = new PrivacyPolicyPageCmsRepository(
        this.privacyPolicyPageCmsModel
    );

    async updateOrCreateData(
        dto: UpdatePrivacyPolicyPageCmsDto
    ): Promise<PrivacyPolicyPageCms | Error> {
        const isExists = await this.privacyPolicyPageCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.privacyPolicyPageCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Privacy policy page cms added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.privacyPolicyPageCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Privacy policy page cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<PrivacyPolicyPageCms | Error> {
        const data = await this.privacyPolicyPageCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
