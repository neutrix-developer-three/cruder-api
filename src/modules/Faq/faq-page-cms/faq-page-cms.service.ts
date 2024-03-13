import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { FaqPageCmsRepository } from './faq-page-cms-repository';
import { UpdateFaqPageCmsDto } from './dto/update-faq-page-cms.dto';
import { FaqPageCms } from './schema/faq-page-cms.schema';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class FaqPageCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        @InjectModel('faq_page_cms')
        private readonly faqPageCmsModel: Model<FaqPageCms>,
        private readonly logService: LogActivityService,
    ) { }

    private readonly faqPageCmsRepository = new FaqPageCmsRepository(
        this.faqPageCmsModel
    );

    async updateOrCreateData(
        dto: UpdateFaqPageCmsDto,
        files: {
            banner_image?: UploadedMulterFileI,
        }
    ): Promise<FaqPageCms | Error> {
        if (files && files.banner_image) {     
            const image: any = await this.doSpaceService.uploadFile(files.banner_image[0], "FaqPageCms/");
            dto.banner_image = image;
        }
        const isExists = await this.faqPageCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.faqPageCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Faq page cms added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.faqPageCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Faq page cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<FaqPageCms | Error> {
        const data = await this.faqPageCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
