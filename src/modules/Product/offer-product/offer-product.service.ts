import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { Product } from '../product/schema/product.schema';
import { ProductCategory } from '../product-category/schema/product-category.schema';
import { ProductCategoryRepository } from '../product-category/product-category.repository';
import { ProductRepository } from '../product/product.repository';
import { CreateOfferProductDto } from './dto/create-offer-product.dto';
import { OfferProduct } from './schema/offer-product.schema';
import { OfferProductRepository } from './offer-product.repository';
import { UpdateOfferProductDto } from './dto/update-offer-product.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';


@Injectable()
export class OfferProductService {
  constructor(private readonly doSpaceService: DoSpacesService,
    @InjectModel('offer_product') private readonly offerProductModel: Model<OfferProduct>,
    @InjectModel('products') private readonly productModel: Model<Product>,
    @InjectModel('product_categories') private readonly productCategoryModel: Model<ProductCategory>,
    private readonly logService: LogActivityService) { }

    private readonly offerProductRepository = new OfferProductRepository(this.offerProductModel);
    private readonly productRepository = new ProductRepository(this.productModel);
    private readonly productCategoryRepository = new ProductCategoryRepository(this.productCategoryModel);

  async create(dto: CreateOfferProductDto,
    files: {
      image?: UploadedMulterFileI
    }): Promise<OfferProduct> {
      if(dto.categoryId){
        const category = await this.productCategoryRepository.findOneEntity(dto?.categoryId);
        if (!category) {
            throw new NotFoundException(
                "Category Not Found"
            );
        }
        dto.category=category;
      }else{
        dto.category=null;
      }

      if(dto.productId){
        const product = await this.productRepository.findOneEntity(dto?.productId);
        if (!product) {
            throw new NotFoundException(
                "Product Not Found"
            );
        }
        dto.product=product;
      }else{
        dto.product=null;
      }

      if (files && files.image) {
        const image: any = await this.doSpaceService.uploadFile(files.image[0], "OfferProduct/");
        dto.image = image;
      }
    const data = await this.offerProductRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(
        Constants.CREATE_FAILED,
      );
    }
    await this.logService.createLog('Offer product added.');
    return ResponseUtils.successResponseHandler(201, "Successfully created data.", "data", data);
  }

  async findAll(pageParam?: string, limitParam?: string): Promise<ProductCategory[]> {
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    const data = await this.offerProductRepository.paginate(page,limit);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }
  
  async formData(): Promise<ProductCategory[]> {
    const product = await this.productRepository.findAll();
    const category = await this.productCategoryRepository.findAll();
    const data = {product,category};
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async findAllCategoryWiseProduct(categoryId:string): Promise<Product[]> {
    const product = await this.productRepository.findAllCategoryWiseProduct(categoryId);
    const data = {product};
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }



  async findOne(id: string): Promise<ProductCategory | null> {
    const data = await this.offerProductRepository.findOneEntity(id);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async update(id: string, dto: UpdateOfferProductDto,
    files: {
      image?: UploadedMulterFileI
    }): Promise<ProductCategory | null> {
    const res = await this.offerProductRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    if(dto.categoryId){
      const category = await this.productCategoryRepository.findOneEntity(dto?.categoryId);
      if (!category) {
          throw new NotFoundException(
              "Category Not Found"
          );
      }
      dto.category=category;
    }else{
      dto.category=null;
    }

    if(dto.productId){
      const product = await this.productRepository.findOneEntity(dto?.productId);
      if (!product) {
          throw new NotFoundException(
              "Product Not Found"
          );
      }
      dto.product=product;
    }else{
      dto.product=null;
    }
    
    const foundImage = (res as OfferProduct)?.image;
    if (files && files.image) {
      const image: any = await this.doSpaceService.uploadFile(files.image[0], "OfferProduct/");
      dto.image = image;
    } else {
       dto.image = foundImage;
    }
    const data = await this.offerProductRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(
        Constants.UPDATE_FAILED,
      );
    }
    await this.logService.createLog('Offer product updated.');
    return ResponseUtils.successResponseHandler(200, "Data updated successfully", "data", data);
  }

  async delete(id: string): Promise<void> {
    const res = await this.offerProductRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }

    const data = await this.offerProductRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(
        Constants.DELETE_FAILED,
      );
    }
    await this.logService.createLog('Offer product deleted.');
    return ResponseUtils.buildDeletedData(data, 200, "Data deleted successfully");
  }
}