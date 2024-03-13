import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { NewsletterPopupCmsRepository } from './newsletter-popup-cms.repository';
import { PopupModalPageRepository } from '../promotional-popup-cms/promotional-popup-page.repository';
import { NewsletterPopupCms } from './schema/newsletter-popup-cms.schema';
import { PopupModalPage } from '../promotional-popup-cms/schema/popup-modal-page.schema';
import { UpdateNewsletterPopupCmsDto } from './dto/update-newsletter-popup-cms.dto';


@Injectable()
export class NewsletterPopupCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        @InjectModel('newsletter_popup_cms')
        private readonly newsletterPopupCmsModel: Model<NewsletterPopupCms>,
        @InjectModel('promotional_popup_page')
        private readonly popupModalPageModel: Model<PopupModalPage>
    ) { }

    private readonly newsletterPopupCmsRepository = new NewsletterPopupCmsRepository(
        this.newsletterPopupCmsModel
    );

    private readonly popupModalPageRepository = new PopupModalPageRepository(
        this.popupModalPageModel
    );

    async updateOrCreateData(
        dto: UpdateNewsletterPopupCmsDto,
        files: {
            image?: UploadedMulterFileI
        }
    ): Promise<NewsletterPopupCms | Error> {
        if(files && files.image){  
            const image: any = await this.doSpaceService.uploadFile(files.image[0], "NewsletterPopupCms/");
            dto.image = image;            
        }
        const isExists = await this.newsletterPopupCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.newsletterPopupCmsRepository.createEntity(dto);
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
            const data = await this.newsletterPopupCmsRepository.updateEntity(id, dto);
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

    async findOneEntity(): Promise<NewsletterPopupCms | Error> {
        const data = await this.newsletterPopupCmsRepository.findOneEntity();
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
