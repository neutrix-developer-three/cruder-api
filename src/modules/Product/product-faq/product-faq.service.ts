import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { ProductFaqRepository } from './product-faq.repository';
import { ProductFaq } from './schema/product-faq.schema';
import { CreateProductFaqDto } from './dto/create-product-faq.dto';
import { UpdateProductFaqDto } from './dto/update-product-faq.dto';
import { Product } from '../product/schema/product.schema';
import { ProductRepository } from '../product/product.repository';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class ProductFaqService {
  constructor(
    @InjectModel('product_faq')
    private readonly productFaqModel: Model<ProductFaq>,
    @InjectModel('products') private readonly productModel: Model<Product>,
    private readonly logService: LogActivityService
  ) {}

  private readonly productFaqRepository =
    new ProductFaqRepository(this.productFaqModel);
  private readonly productRepository = new ProductRepository(this.productModel);

  async create(dto: CreateProductFaqDto): Promise<ProductFaq> {
    const product = await this.productRepository.findOneEntity(dto.productId);
    if(!product){
      throw new BadRequestException(`Product id not found!`);
    }
    dto.product=product;
    const checkProductFaq = await this.productFaqRepository.findOneByFilterQuery({
      productId: dto.productId,
    });
    if (checkProductFaq) {
      throw new BadRequestException(`Product faq already exists!`);
    }
    const data = await this.productFaqRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(Constants.CREATE_FAILED);
    }
    await this.logService.createLog('Product faq added.');
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
  ): Promise<ProductFaq[]> {
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    const data = await this.productFaqRepository.paginate(page, limit);
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
  async formData(){
    const data = await this.productRepository.findAll();
    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async findOne(id: string): Promise<ProductFaq | null> {
    const data = await this.productFaqRepository.findOneEntity(id);
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
    dto: UpdateProductFaqDto,
  ): Promise<ProductFaq | null> {
    const res = await this.productFaqRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }
    const product = await this.productRepository.findOneEntity(dto.productId);
    if(!product){
      throw new BadRequestException(`Product id not found!`);
    }
    dto.product=product;
    const checkProductFaq = await this.productFaqRepository.findOneByFilterQuery({
      productId: dto.productId,
      _id: { $ne: id }
    });
    if (checkProductFaq) {
      throw new BadRequestException(`Product faq already exists!`);
    }
    const data = await this.productFaqRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(Constants.UPDATE_FAILED);
    }
    await this.logService.createLog('Product faq updated.');
    return ResponseUtils.successResponseHandler(
      200,
      'Data updated successfully',
      'data',
      data,
    );
  }

  async delete(id: string): Promise<void> {
    const res = await this.productFaqRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }

    const data = await this.productFaqRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(Constants.DELETE_FAILED);
    }
    await this.logService.createLog('Product faq deleted.');
    return ResponseUtils.buildDeletedData(
      data,
      200,
      'Data deleted successfully',
    );
  }
}
