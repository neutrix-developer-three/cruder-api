import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { SiteSettingsCms } from './schema/site-settings-cms.schema';
import { SiteSettingsCmsRepository } from './site-settings-cms-repository';
import { UpdateSiteSettingsCmDto } from './dto/update-site-settings-cms.dto';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class SiteSettingsCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        @InjectModel('site_settings_cms')
        private readonly siteSettingsCmsModel: Model<SiteSettingsCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly siteSettingsCmsRepository = new SiteSettingsCmsRepository(
        this.siteSettingsCmsModel
    );

    async updateOrCreateData(
        dto: UpdateSiteSettingsCmDto,
        files: {
            logo?: UploadedMulterFileI,
            login_background?:UploadedMulterFileI
        }
    ): Promise<SiteSettingsCms | Error> {
        if (files) {
            if(files.logo){
                const logoImage: any = await this.doSpaceService.uploadFile(files.logo[0], "SiteSettingsCMS/");
                dto.logo = logoImage;
            }
            if(files.login_background){
                const login_background: any = await this.doSpaceService.uploadFile(files.login_background[0], "SiteSettingsCMS/");
                dto.login_background = login_background;
            }
        }
        const isExists = await this.siteSettingsCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.siteSettingsCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Site settings cms added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.siteSettingsCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Site settings cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<SiteSettingsCms | Error> {
        const data = await this.siteSettingsCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
