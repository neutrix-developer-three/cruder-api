import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { CartPageComponentUiCms } from './schema/cart-page-component-ui-cms.schema';
import { CartPageComponentUiCmsRepository } from './cart-page-component-ui-cms-repository';
import { UpdateCartPageComponentUiCmsDto } from './dto/update-cart-page-component-ui-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class CartPageComponentUiCmsService {
    constructor(
        @InjectModel('cart_page_component_ui_cms')
        private readonly cartPageComponentUiCmsModel: Model<CartPageComponentUiCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly cartPageComponentUiCmsRepository = new CartPageComponentUiCmsRepository(
        this.cartPageComponentUiCmsModel
    );

    async updateOrCreateData(
        dto: UpdateCartPageComponentUiCmsDto
    ): Promise<CartPageComponentUiCms | Error> {
        const isExists = await this.cartPageComponentUiCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.cartPageComponentUiCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Cart page component ui added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.cartPageComponentUiCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Cart page component ui updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<CartPageComponentUiCms | Error> {
        const data = await this.cartPageComponentUiCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
