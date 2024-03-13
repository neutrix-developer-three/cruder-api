import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { ProductMetaCmsRepository } from './product-meta-cms-repository';
import { ProductMetaCms } from './schema/product-meta-cms.schema';
import { UpdateProductMetaCmsDto } from './dto/update-product-meta-cms.dto';
import { Product } from 'src/modules/Product/product/schema/product.schema';
import { ProductRepository } from 'src/modules/Product/product/product.repository';
import { FilterDto } from 'src/core/filter.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class ProductMetaCmsService {
    constructor(
        @InjectModel('product_meta_cms')
        private readonly productMetaCmsModel: Model<ProductMetaCms>,
        @InjectModel('products') private readonly productModel: Model<Product>,
        private readonly logService: LogActivityService,
    ) { }

    private readonly productMetaCmsRepository = new ProductMetaCmsRepository(
        this.productMetaCmsModel
    );
    private readonly productRepository = new ProductRepository(this.productModel);

    async updateOrCreateData(
        productId:string,
        dto: UpdateProductMetaCmsDto
    ): Promise<ProductMetaCms | Error> {
        const product = await this.productRepository.findOneEntity(productId);
          if (!product) {
            throw new NotFoundException('Product Not Found');
          }
        const isExists = await this.productMetaCmsRepository.findOneByFilterQuery({
            productId: productId
        });
        dto.productId=productId;
        if (!isExists) {
            const data = await this.productMetaCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Product meta added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.productMetaCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Product meta updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
        
    }

    async findAll(filterDto:FilterDto): Promise<ProductMetaCms | Error> {
        const paginateData = await this.productRepository.paginate(filterDto);
        for (const product of paginateData?.data) {
            const productMeta = await this.productMetaCmsRepository.findOneByFilterQuery({productId:product._id});
            if(productMeta){
                product['productMeta'] = productMeta;
            }
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", paginateData);
    }


}
