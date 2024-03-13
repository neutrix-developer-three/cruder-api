import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { FaqMetaCms } from './schema/faq-meta-cms.schema';
import { FaqMetaCmsRepository } from './faq-meta-cms-repository';
import { UpdateFaqMetaCmsDto } from './dto/update-faq-meta-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class FaqMetaCmsService {
    constructor(
        @InjectModel('seo_faq_meta_cms')
        private readonly faqMetaCmsModel: Model<FaqMetaCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly faqMetaCmsRepository = new FaqMetaCmsRepository(
        this.faqMetaCmsModel
    );

    async updateOrCreateData(
        dto: UpdateFaqMetaCmsDto
    ): Promise<FaqMetaCms | Error> {
        const isExists = await this.faqMetaCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.faqMetaCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Faq meta added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.faqMetaCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Faq meta updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<FaqMetaCms | Error> {
        const data = await this.faqMetaCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }

}
