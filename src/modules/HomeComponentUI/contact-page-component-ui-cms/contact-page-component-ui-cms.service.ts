import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { ContactPageComponentUiCmsRepository } from './contact-page-component-ui-cms-repository';
import { ContactPageComponentUiCms } from './schema/contact-page-component-ui-cms.schema';
import { UpdateContactPageComponentUiCmsDto } from './dto/update-contact-page-component-ui-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class ContactPageComponentUiCmsService {
    constructor(
        @InjectModel('contact_page_component_ui_cms')
        private readonly contactPageComponentUiCmsModel: Model<ContactPageComponentUiCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly contactPageComponentUiCmsRepository = new ContactPageComponentUiCmsRepository(
        this.contactPageComponentUiCmsModel
    );

    async updateOrCreateData(
        dto: UpdateContactPageComponentUiCmsDto
    ): Promise<ContactPageComponentUiCms | Error> {
        const isExists = await this.contactPageComponentUiCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.contactPageComponentUiCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Contact page component ui added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.contactPageComponentUiCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Contact page component ui updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<ContactPageComponentUiCms | Error> {
        const data = await this.contactPageComponentUiCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
