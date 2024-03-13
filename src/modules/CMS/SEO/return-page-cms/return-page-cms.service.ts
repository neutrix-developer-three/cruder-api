import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { ReturnPageCms } from './schema/return-page-cms.schema';
import { ReturnPageCmsRepository } from './return-page-cms-repository';
import { UpdateReturnPageCmsDto } from './dto/update-return-page-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class ReturnPageCmsService {
    constructor(
        @InjectModel('seo_return_page_cms')
        private readonly returnPageCmsModel: Model<ReturnPageCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly returnPageCmsRepository = new ReturnPageCmsRepository(
        this.returnPageCmsModel
    );

    async updateOrCreateData(
        dto: UpdateReturnPageCmsDto
    ): Promise<ReturnPageCms | Error> {
        const isExists = await this.returnPageCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.returnPageCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Return page cms added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.returnPageCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Return page cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<ReturnPageCms | Error> {
        const data = await this.returnPageCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
