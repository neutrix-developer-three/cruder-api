import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { ProductComponentUiCmsRepository } from './product-component-ui-cms-repository';
import { ProductComponentUiCms } from './schema/product-component-ui-cms.schema';
import { UpdateProductComponentUiCmsDto } from './dto/update-product-component-ui-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class ProductComponentUiCmsService {
    constructor(
        @InjectModel('product_component_ui_cms')
        private readonly productComponentUiCmsModel: Model<ProductComponentUiCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly productComponentUiCmsRepository = new ProductComponentUiCmsRepository(
        this.productComponentUiCmsModel
    );

    async updateOrCreateData(
        dto: UpdateProductComponentUiCmsDto
    ): Promise<ProductComponentUiCms | Error> {
        const isExists = await this.productComponentUiCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.productComponentUiCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Product component ui added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.productComponentUiCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Product component ui updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<ProductComponentUiCms | Error> {
        const data = await this.productComponentUiCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
