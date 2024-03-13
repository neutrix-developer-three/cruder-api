import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { ProductReviewRepository } from './product-review.repository';
import { ProductReview } from './schema/product-review.schema';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { Product } from '../product/schema/product.schema';
import { ProductRepository } from '../product/product.repository';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import { CreateUserProductReviewDto } from './dto/create-user-product-review.dto';
import { getCurrentDate } from 'src/utils/dates.utils';
import { UpdateProductDto } from '../product/dto/update-product.dto';

@Injectable()
export class ProductReviewService {
  constructor(private readonly doSpaceService: DoSpacesService,
    @InjectModel('product_review') private readonly productReviewModel: Model<ProductReview>,
    @InjectModel('products') private readonly productModel: Model<Product>,) { }

  private readonly productReviewRepository = new ProductReviewRepository(this.productReviewModel);
  private readonly productRepository = new ProductRepository(this.productModel);

  async create(dto: CreateProductReviewDto,
    files: {
      reviewerImage?: UploadedMulterFileI
    }): Promise<ProductReview> {
      if(dto.productId){
        const product = await this.productRepository.findOneEntity(dto?.productId);
        if (!product) {
            throw new NotFoundException(
                "Product Not Found"
            );
        }
        dto.product=product;
        if(dto?.reviewStatus && dto?.reviewStatus==='Confirm'){
          const rating = (product.rating)?product.rating:0;
          const productReviewData  = {
            rating:rating+1
          } as UpdateProductDto;
          await this.productRepository.updateEntity(product._id.toString(),productReviewData);
        }
      }

      if (files && files.reviewerImage) {
        const reviewerImage: any = await this.doSpaceService.uploadFile(files.reviewerImage[0], "ProductReview/");
        dto.reviewerImage = reviewerImage;
      }
    const data = await this.productReviewRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(
        Constants.CREATE_FAILED,
      );
    }
    return ResponseUtils.successResponseHandler(201, "Successfully created data.", "data", data);
  }

  async createUserReview(dto: CreateUserProductReviewDto): Promise<ProductReview> {
      if(dto.productId){
        const product = await this.productRepository.findOneEntity(dto?.productId);
        if (!product) {
            throw new NotFoundException(
                "Product Not Found"
            );
        }
        dto.product=product;
        // const rating = (product.rating)?product.rating:0;
        // const productReviewData  = {
        //   rating:rating+1
        // } as UpdateProductDto;
        // await this.productRepository.updateEntity(product._id.toString(),productReviewData);
      }
    dto.reviewDate=getCurrentDate();
    const data = await this.productReviewRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(
        Constants.CREATE_FAILED,
      );
    }
    return ResponseUtils.successResponseHandler(201, "Successfully created data.", "data", data);
  }

  async findAll(pageParam?: string, limitParam?: string): Promise<ProductReview[]> {
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    const data = await this.productReviewRepository.paginate(page,limit);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }
  
  async formData(): Promise<Product[]> {
    const data = await this.productRepository.findAll();
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }


  async findOne(id: string): Promise<ProductReview | null> {
    const data = await this.productReviewRepository.findOneEntity(id);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async update(id: string, dto: UpdateProductReviewDto,
    files: {
      reviewerImage?: UploadedMulterFileI
    }): Promise<ProductReview | null> {
    const res = await this.productReviewRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    
    if(dto.productId){
      const product = await this.productRepository.findOneEntity(dto?.productId);
      if (!product) {
          throw new NotFoundException(
              "Product Not Found"
          );
      }
      dto.product=product;
      if(dto?.reviewStatus && dto?.reviewStatus!=res.reviewStatus){
        const rating = (product.rating)?product.rating:0;
        let newRating=rating;
        if(dto?.reviewStatus==='Confirm'){
          newRating=rating+1
        }else if(res.reviewStatus==='Confirm'){
          newRating=rating-1
        }
        const productReviewData  = {
          rating:newRating
        } as UpdateProductDto;
        await this.productRepository.updateEntity(product._id.toString(),productReviewData);
      }
    }else{
      dto.product=null;
    }
    const foundImage = (res as ProductReview)?.reviewerImage;
    if (files && files.reviewerImage) {
      const reviewerImage: any = await this.doSpaceService.uploadFile(files.reviewerImage[0], "ProductReview/");
      dto.reviewerImage = reviewerImage;
    } else {
       dto.reviewerImage = foundImage;
    }
    const data = await this.productReviewRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(
        Constants.UPDATE_FAILED,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data updated successfully", "data", data);
  }

  async delete(id: string): Promise<void> {
    const res = await this.productReviewRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    const product = await this.productRepository.findOneEntity(res?.productId);
    if(product){
      if(product.rating>0){
        const rating = product.rating;
        const productReviewData  = {
          rating:rating-1
        } as UpdateProductDto;
        await this.productRepository.updateEntity(product._id.toString(),productReviewData);
      }
    }
    const data = await this.productReviewRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(
        Constants.DELETE_FAILED,
      );
    }
    return ResponseUtils.buildDeletedData(data, 200, "Data deleted successfully");
  }
}