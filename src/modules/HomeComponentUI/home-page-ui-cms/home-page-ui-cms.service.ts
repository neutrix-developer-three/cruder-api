import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { HomePageUiCmsRepository } from './home-page-ui-cms-repository';
import { HomePageUiCms } from './schema/home-page-ui-cms.schema';
import { UpdateHomePageUiCmsDto } from './dto/update-home-page-ui-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class HomePageUiCmsService {
    constructor(
        @InjectModel('home_page_ui_cms')
        private readonly homePageUiCmsModel: Model<HomePageUiCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly homePageUiCmsRepository = new HomePageUiCmsRepository(
        this.homePageUiCmsModel
    );

    async updateOrCreateData(
        dto: UpdateHomePageUiCmsDto
    ): Promise<HomePageUiCms | Error> {
        const isExists = await this.homePageUiCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.homePageUiCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Home page component ui added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.homePageUiCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Home page component ui updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<HomePageUiCms | Error> {
        const data = await this.homePageUiCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
