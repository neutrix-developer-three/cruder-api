import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { ContactUsCms } from './schema/contact-us-cms.schema';
import { ContactUsCmsRepository } from './contact-us-cms-repository';
import { UpdateContactUsCmsDto } from './dto/update-contact-us-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class ContactUsCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        @InjectModel('contact_us_cms')
        private readonly contactUsCmsModel: Model<ContactUsCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly contactUsCmsRepository = new ContactUsCmsRepository(
        this.contactUsCmsModel
    );

    async updateOrCreateData(
        dto: UpdateContactUsCmsDto,
        files: {
            banner_image?: UploadedMulterFileI,
            image?: UploadedMulterFileI,
            location_background_image?: UploadedMulterFileI,
            email_icon?: UploadedMulterFileI,
            call_icon?: UploadedMulterFileI,
            social_icon_1?: UploadedMulterFileI,
            social_icon_2?: UploadedMulterFileI,
            social_icon_3?: UploadedMulterFileI,
            social_icon_4?: UploadedMulterFileI,
            
        }
    ): Promise<ContactUsCms | Error> {
        if (files) {
            if(files.banner_image){
                const banner_image: any = await this.doSpaceService.uploadFile(files.banner_image[0], "ContactUsCMS/");
                dto.banner_image = banner_image;
            }
            if(files.image){
                const image: any = await this.doSpaceService.uploadFile(files.image[0], "ContactUsCMS/");
                dto.image = image;
            }
            if(files.location_background_image){
                const location_background_image: any = await this.doSpaceService.uploadFile(files.location_background_image[0], "ContactUsCMS/");
                dto.location_background_image = location_background_image;
            }

            if(files.email_icon){
                const email_icon: any = await this.doSpaceService.uploadFile(files.email_icon[0], "ContactUsCMS/");
                dto.email_icon = email_icon;
            }
            if(files.call_icon){
                const call_icon: any = await this.doSpaceService.uploadFile(files.call_icon[0], "ContactUsCMS/");
                dto.call_icon = call_icon;
            }
            if(files.social_icon_1){
                const social_icon_1: any = await this.doSpaceService.uploadFile(files.social_icon_1[0], "ContactUsCMS/");
                dto.social_icon_1 = social_icon_1;
            }

            if(files.social_icon_2){
                const social_icon_2: any = await this.doSpaceService.uploadFile(files.social_icon_2[0], "ContactUsCMS/");
                dto.social_icon_2 = social_icon_2;
            }
            if(files.social_icon_3){
                const social_icon_3: any = await this.doSpaceService.uploadFile(files.social_icon_3[0], "ContactUsCMS/");
                dto.social_icon_3 = social_icon_3;
            }
            if(files.social_icon_4){
                const social_icon_4: any = await this.doSpaceService.uploadFile(files.social_icon_4[0], "ContactUsCMS/");
                dto.social_icon_4 = social_icon_4;
            }
        }
        const isExists = await this.contactUsCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.contactUsCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Contact us cms added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.contactUsCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Contact us cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<ContactUsCms | Error> {
        const data = await this.contactUsCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
