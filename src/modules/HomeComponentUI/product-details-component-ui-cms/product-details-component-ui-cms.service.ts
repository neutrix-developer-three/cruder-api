import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { ProductDetailsComponentUiCms } from './schema/product-details-component-ui-cms.schema';
import { UpdateProductDetailsComponentUiCmsDto } from './dto/update-product-details-component-ui-cms.dto';
import { ProductDetailsComponentUiCmsRepository } from './product-details-component-ui-cms-repository';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class ProductDetailsComponentUiCmsService {
    constructor(
        @InjectModel('product_details_component_ui_cms')
        private readonly productDetailsComponentUiCmsModel: Model<ProductDetailsComponentUiCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly productDetailsComponentUiCmsRepository = new ProductDetailsComponentUiCmsRepository(
        this.productDetailsComponentUiCmsModel
    );

    async updateOrCreateData(
        dto: UpdateProductDetailsComponentUiCmsDto
    ): Promise<ProductDetailsComponentUiCms | Error> {
        const isExists = await this.productDetailsComponentUiCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.productDetailsComponentUiCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Product details component ui added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.productDetailsComponentUiCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Product details component ui updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<ProductDetailsComponentUiCms | Error> {
        const data = await this.productDetailsComponentUiCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
