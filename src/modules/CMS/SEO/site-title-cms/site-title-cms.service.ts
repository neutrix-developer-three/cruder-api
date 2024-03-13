import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { SiteTitleCms } from './schema/site-title-cms.schema';
import { SiteTitleCmsRepository } from './site-title-cms-repository';
import { UpdateSiteTitleCmsDto } from './dto/update-site-title-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class SiteTitleCmsService {
    constructor(
        @InjectModel('seo_site_title_cms')
        private readonly siteTitleCmsModel: Model<SiteTitleCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly siteTitleCmsRepository = new SiteTitleCmsRepository(
        this.siteTitleCmsModel
    );

    async updateOrCreateData(
        dto: UpdateSiteTitleCmsDto
    ): Promise<SiteTitleCms | Error> {
        const isExists = await this.siteTitleCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.siteTitleCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Site title cms added');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.siteTitleCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Site title cms updated');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<SiteTitleCms | Error> {
        const data = await this.siteTitleCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
