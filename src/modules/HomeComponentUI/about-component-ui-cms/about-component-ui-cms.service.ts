import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { AboutComponentUiCmsRepository } from './about-component-ui-cms-repository';
import { AboutComponentUiCms } from './schema/about-component-ui-cms.schema';
import { UpdateAboutComponentUiCmsDto } from './dto/update-about-component-ui-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class AboutComponentUiCmsService {
    constructor(
        @InjectModel('about_component_ui_cms')
        private readonly aboutComponentUiCmsModel: Model<AboutComponentUiCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly aboutComponentUiCmsRepository = new AboutComponentUiCmsRepository(
        this.aboutComponentUiCmsModel
    );

    async updateOrCreateData(
        dto: UpdateAboutComponentUiCmsDto
    ): Promise<AboutComponentUiCms | Error> {
        const isExists = await this.aboutComponentUiCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.aboutComponentUiCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('About component ui cms added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.aboutComponentUiCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('About component ui cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<AboutComponentUiCms | Error> {
        const data = await this.aboutComponentUiCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
