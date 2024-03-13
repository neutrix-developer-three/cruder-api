import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { ProductCategoryFaqRepository } from './product-category-faq.repository';
import { ProductCategoryFaq } from './schema/product-category-faq.schema';
import { CreateProductCategoryFaqDto } from './dto/create-product-category-faq.dto';
import { UpdateProductCategoryFaqDto } from './dto/update-product-category-faq.dto';
import { ProductCategory } from '../product-category/schema/product-category.schema';
import { ProductCategoryRepository } from '../product-category/product-category.repository';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class ProductCategoryFaqService {
  constructor(
    @InjectModel('product_category_faq')
    private readonly productCategoryFaqModel: Model<ProductCategoryFaq>,
    @InjectModel('product_categories') private readonly ProductCategoryModel: Model<ProductCategory>,
    private readonly logService: LogActivityService
  ) {}

  private readonly productCategoryFaqRepository =
    new ProductCategoryFaqRepository(this.productCategoryFaqModel);
  private readonly productCategoryRepository = new ProductCategoryRepository(this.ProductCategoryModel);

  async create(dto: CreateProductCategoryFaqDto): Promise<ProductCategoryFaq> {
    const category = await this.productCategoryRepository.findOneEntity(dto.categoryId);
    if(!category){
      throw new BadRequestException(`Category id not found!`);
    }
    dto.category=category;
    const checkCategory = await this.productCategoryFaqRepository.findOneByFilterQuery({
      categoryId: dto.categoryId,
    });
    if (checkCategory) {
      throw new BadRequestException(`Category faq already exists!`);
    }
    const data = await this.productCategoryFaqRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(Constants.CREATE_FAILED);
    }
    await this.logService.createLog('Product category faq added.');
    return ResponseUtils.successResponseHandler(
      201,
      'Successfully created data.',
      'data',
      data,
    );
  }

  async findAll(
    pageParam?: string,
    limitParam?: string,
  ): Promise<ProductCategoryFaq[]> {
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    const data = await this.productCategoryFaqRepository.paginate(page, limit);
    if (!data) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }
    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async findOne(id: string): Promise<ProductCategoryFaq | null> {
    const data = await this.productCategoryFaqRepository.findOneEntity(id);
    if (!data) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }
    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async update(
    id: string,
    dto: UpdateProductCategoryFaqDto,
  ): Promise<ProductCategoryFaq | null> {
    const res = await this.productCategoryFaqRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }
    const category = await this.productCategoryRepository.findOneEntity(dto.categoryId);
    if(!category){
      throw new BadRequestException(`Category id not found!`);
    }
    dto.category=category;
    const checkCategory = await this.productCategoryFaqRepository.findOneByFilterQuery({
      categoryId: dto.categoryId,
      _id: { $ne: id }
    });
    if (checkCategory) {
      throw new BadRequestException(`Category faq already exists!`);
    }
    const data = await this.productCategoryFaqRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(Constants.UPDATE_FAILED);
    }
    await this.logService.createLog('Product category faq updated.');
    return ResponseUtils.successResponseHandler(
      200,
      'Data updated successfully',
      'data',
      data,
    );
  }

  async delete(id: string): Promise<void> {
    const res = await this.productCategoryFaqRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }

    const data = await this.productCategoryFaqRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(Constants.DELETE_FAILED);
    }
    await this.logService.createLog('Product category faq deleted.');
    return ResponseUtils.buildDeletedData(
      data,
      200,
      'Data deleted successfully',
    );
  }
}
