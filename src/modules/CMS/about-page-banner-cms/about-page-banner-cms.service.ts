import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UploadedMulterFileI } from "src/modules/SpacesModule/SpacesService";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { Constants } from "src/utils/constants";
import { ResponseUtils } from "src/utils/response.utils";
import { AboutPageBannerCMSRepository } from "./about-page-banner-cms.repository";
import { UpdateAboutPageBannerCMSDto } from './dto/update-about-page-banner-cms.dto';
import { AboutPageBannerCMS } from "./schema/about-page-banner-cms.schema";
import { LogActivityService } from "src/modules/LogActivity/log-activity.service";

@Injectable()
export class AboutPageBannerCMSService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        private readonly logService: LogActivityService,
        @InjectModel('about_page_banner_cms')
        private readonly aboutPageBannerCMSModel: Model<AboutPageBannerCMS>
    ) { }

    private readonly aboutPageBannerCMSRepository =
        new AboutPageBannerCMSRepository(this.aboutPageBannerCMSModel);

    async updateOrCreateData(
        dto: UpdateAboutPageBannerCMSDto,
        files: {
            backgroundImage?: UploadedMulterFileI
        }
    ): Promise<AboutPageBannerCMS | Error> {
        if (files && files.backgroundImage) {
            const backgroundImage: any = await this.doSpaceService.uploadFile(files.backgroundImage[0], "AboutPageBannerCMS/");
            dto.backgroundImage = backgroundImage;
        }
        const isExists = await this.aboutPageBannerCMSRepository.findOneByFilterQuery({ isDeleted: false });
        if (!isExists) {
            const data = await this.aboutPageBannerCMSRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('About page banner added.');
            return ResponseUtils.successResponseHandler(201, "Data created successfully!", "data", data);
        } else {
            const id = isExists?._id.toString();
            const data = await this.aboutPageBannerCMSRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('About page banner updated.');
            return ResponseUtils.successResponseHandler(200, "Data updated successfully!", "data", data);
        }
    }

    async findAll(): Promise<AboutPageBannerCMS[] | Error> {
        const data = await this.aboutPageBannerCMSRepository.findAll();
        if (!data) {
            throw new HttpException(
                Constants.NOT_FOUND,
                HttpStatus.NOT_FOUND
            );
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }
}