import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { ShippingPageCms } from './schema/shipping-page-cms.schema';
import { ShippingPageCmsRepository } from './shipping-page-cms-repository';
import { UpdateShippingPageCmsDto } from './dto/update-shipping-page-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class ShippingPageCmsService {
    constructor(
        @InjectModel('seo_shipping_page_cms')
        private readonly shippingPageCmsModel: Model<ShippingPageCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly shippingPageCmsRepository = new ShippingPageCmsRepository(
        this.shippingPageCmsModel
    );

    async updateOrCreateData(
        dto: UpdateShippingPageCmsDto
    ): Promise<ShippingPageCms | Error> {
        const isExists = await this.shippingPageCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.shippingPageCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Shipping page cms added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.shippingPageCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Shipping page cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<ShippingPageCms | Error> {
        const data = await this.shippingPageCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
