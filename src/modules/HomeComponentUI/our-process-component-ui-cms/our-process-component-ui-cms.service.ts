import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { OurProcessComponentUiCms } from './schema/our-process-component-ui-cms.schema';
import { OurProcessComponentUiCmsRepository } from './our-process-component-ui-cms-repository';
import { UpdateOurProcessComponentUiCmsDto } from './dto/update-our-process-component-ui-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class OurProcessComponentUiCmsService {
    constructor(
        @InjectModel('our_process_component_ui_cms')
        private readonly ourProcessComponentUiCmsModel: Model<OurProcessComponentUiCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly ourProcessComponentUiCmsRepository = new OurProcessComponentUiCmsRepository(
        this.ourProcessComponentUiCmsModel
    );

    async updateOrCreateData(
        dto: UpdateOurProcessComponentUiCmsDto
    ): Promise<OurProcessComponentUiCms | Error> {
        const isExists = await this.ourProcessComponentUiCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.ourProcessComponentUiCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Our process page component ui added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.ourProcessComponentUiCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Our process page component ui updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<OurProcessComponentUiCms | Error> {
        const data = await this.ourProcessComponentUiCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
