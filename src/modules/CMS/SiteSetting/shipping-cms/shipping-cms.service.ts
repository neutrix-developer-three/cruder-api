import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { ShippingCms } from './schema/shipping-cms.schema';
import { ShippingCmsRepository } from './shipping-cms-repository';
import { UpdateShippingCmsDto } from './dto/update-shipping-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';


@Injectable()
export class ShippingCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        @InjectModel('shipping_cms')
        private readonly shippingCmsModel: Model<ShippingCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly shippingCmsRepository = new ShippingCmsRepository(
        this.shippingCmsModel
    );

    async updateOrCreateData(
        dto: UpdateShippingCmsDto,
        files: {
            banner_image?: UploadedMulterFileI
        }
    ): Promise<ShippingCms | Error> {
        if (files && files.banner_image) {
            const bannerImage: any = await this.doSpaceService.uploadFile(files.banner_image[0], "ShippingCMS/");
            dto.banner_image = bannerImage;
        }
        const isExists = await this.shippingCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.shippingCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Shipping cms added');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.shippingCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Shipping cms updated');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<ShippingCms | Error> {
        const data = await this.shippingCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
