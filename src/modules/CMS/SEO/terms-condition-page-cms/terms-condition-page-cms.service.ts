import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { TermsConditionPageCms } from './schema/terms-condition-page-cms.schema';
import { TermsConditionPageCmsRepository } from './terms-conditions-page-cms-repository';
import { UpdateTermsConditionPageCmsDto } from './dto/update-terms-condition-page-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class TermsConditionPageCmsService {
    constructor(
        @InjectModel('seo_terms_condition_page_cms')
        private readonly termsConditionPageCmsModel: Model<TermsConditionPageCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly termsConditionPageCmsRepository = new TermsConditionPageCmsRepository(
        this.termsConditionPageCmsModel
    );

    async updateOrCreateData(
        dto: UpdateTermsConditionPageCmsDto
    ): Promise<TermsConditionPageCms | Error> {
        const isExists = await this.termsConditionPageCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.termsConditionPageCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Terms condition page cms added');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.termsConditionPageCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Terms condition page cms updated');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<TermsConditionPageCms | Error> {
        const data = await this.termsConditionPageCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
