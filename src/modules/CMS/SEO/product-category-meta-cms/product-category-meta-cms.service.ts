import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { ProductCategory } from 'src/modules/Product/product-category/schema/product-category.schema';
import { ProductCategoryRepository } from 'src/modules/Product/product-category/product-category.repository';
import { ProductCategoryMetaCms } from './schema/product-category-meta-cms.schema';
import { ProductCategoryMetaCmsRepository } from './product-category-meta-cms-repository';
import { UpdateProductCategoryMetaCmsDto } from './dto/update-product-category-meta-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class ProductCategoryMetaCmsService {
    constructor(
        @InjectModel('product_category_meta_cms')
        private readonly productCategoryMetaCmsModel: Model<ProductCategoryMetaCms>,
        private readonly logService: LogActivityService,
        @InjectModel('product_categories') private readonly productCategoryModel: Model<ProductCategory>,
    ) { }

    private readonly productCategoryMetaCmsRepository = new ProductCategoryMetaCmsRepository(
        this.productCategoryMetaCmsModel
    );
    private readonly productCategoryRepository = new ProductCategoryRepository(this.productCategoryModel);

    async updateOrCreateData(
        categoryId:string,
        dto: UpdateProductCategoryMetaCmsDto
    ): Promise<ProductCategoryMetaCms | Error> {
        const productCategory = await this.productCategoryRepository.findOneEntity(categoryId);
          if (!productCategory) {
            throw new NotFoundException('Product category Not Found');
          }
        const isExists = await this.productCategoryMetaCmsRepository.findOneByFilterQuery({
            categoryId: categoryId
        });
        dto.categoryId=categoryId;
        if (!isExists) {
            const data = await this.productCategoryMetaCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Product category meta added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.productCategoryMetaCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Product category meta updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
        
    }

    async findAll(pageParam?: string, limitParam?: string): Promise<ProductCategoryMetaCms | Error> {
        const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
        const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
        const categoryData = await this.productCategoryRepository.paginate(page,limit);
        for (const category of categoryData?.data) {
            const productCategoryMeta = await this.productCategoryMetaCmsRepository.findOneByFilterQuery({categoryId:category._id});
            if(productCategoryMeta){
                category['productCategoryMeta'] = productCategoryMeta;
            }
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", categoryData);
    }


}
