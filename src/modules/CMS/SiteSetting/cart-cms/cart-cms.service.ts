import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { CartCmsRepository } from './cart-cms-repository';
import { CartCms } from './schema/cart-cms.schema';
import { UpdateCartCmsDto } from './dto/update-cart-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class CartCmsService {
    constructor(
        @InjectModel('cart_cms')
        private readonly cartCmsModel: Model<CartCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly cartCmsRepository = new CartCmsRepository(
        this.cartCmsModel
    );

    async updateOrCreateData(
        dto: UpdateCartCmsDto
    ): Promise<CartCms | Error> {
        const isExists = await this.cartCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.cartCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Cart cms added');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.cartCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Cart cms updated');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<CartCms | Error> {
        const data = await this.cartCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
