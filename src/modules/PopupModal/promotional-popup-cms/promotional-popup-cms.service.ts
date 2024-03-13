import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { PromotionalPopupCms } from './schema/promotional-popup-cms.schema';
import { UpdatePromotionalPopupCmsDto } from './dto/update-promotional-popup-cms.dto';
import { PromotionalPopupCmsRepository } from './promotional-popup-cms.repository';
import { PopupModalPage } from './schema/popup-modal-page.schema';
import { PopupModalPageRepository } from './promotional-popup-page.repository';


@Injectable()
export class PromotionalPopupCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        @InjectModel('promotional_popup_cms')
        private readonly promotionalPopupCmsModel: Model<PromotionalPopupCms>,
        @InjectModel('promotional_popup_page')
        private readonly popupModalPageModel: Model<PopupModalPage>
    ) { }

    private readonly promotionalPopupCmsRepository = new PromotionalPopupCmsRepository(
        this.promotionalPopupCmsModel
    );

    private readonly popupModalPageRepository = new PopupModalPageRepository(
        this.popupModalPageModel
    );

    async updateOrCreateData(
        dto: UpdatePromotionalPopupCmsDto,
        files: {
            image?: UploadedMulterFileI,
            logo?:UploadedMulterFileI
        }
    ): Promise<PromotionalPopupCms | Error> {
        if(files){
            if(files.image){
                const image: any = await this.doSpaceService.uploadFile(files.image[0], "PromotionalPopupCms/");
                dto.image = image;
            }
            if(files.logo){
                const logo: any = await this.doSpaceService.uploadFile(files.logo[0], "PromotionalPopupCms/");
                dto.logo = logo;
            }
        }
        const isExists = await this.promotionalPopupCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.promotionalPopupCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.promotionalPopupCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<PromotionalPopupCms | Error> {
        const data = await this.promotionalPopupCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }

    async formData(): Promise<PopupModalPage[]> {
        const popupModalPage = await this.popupModalPageRepository.findAll();   
        const data = {popupModalPage};       
        return ResponseUtils.successResponseHandler(
          200,
          'Data fetched successfully',
          'data',
          data,
        );
      }


}
