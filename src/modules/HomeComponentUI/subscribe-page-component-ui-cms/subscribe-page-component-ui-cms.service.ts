import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { SubscribePageComponentUiCms } from './schema/subscribe-page-component-ui-cms.schema';
import { SubscribePageComponentUiCmsRepository } from './subscribe-page-component-ui-cms-repository';
import { UpdateSubscribePageComponentUiCmsDto } from './dto/update-subscribe-page-component-ui-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class SubscribePageComponentUiCmsService {
    constructor(
        @InjectModel('subscribe_page_component_ui_cms')
        private readonly subscribePageComponentUiCmsModel: Model<SubscribePageComponentUiCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly subscribePageComponentUiCmsRepository = new SubscribePageComponentUiCmsRepository(
        this.subscribePageComponentUiCmsModel
    );

    async updateOrCreateData(
        dto: UpdateSubscribePageComponentUiCmsDto
    ): Promise<SubscribePageComponentUiCms | Error> {
        const isExists = await this.subscribePageComponentUiCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.subscribePageComponentUiCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Subscribe page component ui added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.subscribePageComponentUiCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Subscribe page component ui updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<SubscribePageComponentUiCms | Error> {
        const data = await this.subscribePageComponentUiCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
