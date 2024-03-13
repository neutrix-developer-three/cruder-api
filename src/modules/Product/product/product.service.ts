import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { urlSlug } from 'src/utils/common-helper';
import { ProductRepository } from './product.repository';
import { Product } from './schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCategory } from '../product-category/schema/product-category.schema';
import { ProductCategoryRepository } from '../product-category/product-category.repository';
import { ProductTag } from '../product-tag/schema/product-tag.schema';
import { ProductTagRepository } from '../product-tag/product-tag.repository';
import { FilterDto } from 'src/core/filter.dto';
import { ProductImages } from './product-images.interface';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';
import { SlugDetails } from '../product-category/schema/slug-details.schema';
import { SlugDetailsRepository } from '../product-category/slug-details.repository';
import { CreateSlugDetailsDto } from '../product-category/dto/create-slug-details.dto';


@Injectable()
export class ProductService {
  constructor(
    private readonly doSpaceService: DoSpacesService,
    @InjectModel('products') private readonly productModel: Model<Product>,
    @InjectModel('product_categories')
    private readonly productCategoryModel: Model<ProductCategory>,
    @InjectModel('product_tag')
    private readonly productTagModel: Model<ProductTag>,
    @InjectModel('slug_details') private readonly slugDetailsModel: Model<SlugDetails>,
    private readonly logService: LogActivityService
  ) {}

  private readonly productRepository = new ProductRepository(this.productModel);
  private readonly productCategoryRepository = new ProductCategoryRepository(
    this.productCategoryModel,
  );
  private readonly productTagRepository = new ProductTagRepository(
    this.productTagModel,
  );
  private readonly slugDetailsRepository = new SlugDetailsRepository(this.slugDetailsModel);


  async create(
    dto: CreateProductDto,
    files: {
      image?: UploadedMulterFileI;
      product_images?: UploadedMulterFileI[];
    },
  ): Promise<Product> {
    if (!dto.position) {
      let position = 1;
      const maxPositionData =
        await this.productRepository.findMaxPositionEntity();
      if (maxPositionData?.position) {
        console.log('found');
        position = maxPositionData.position + 1;
      }
      dto.position = position;
    }
    const checkName = await this.productRepository.findOneByFilterQuery({
      name: dto.name,
    });
    if (checkName) {
      throw new BadRequestException(`Product name already exists!`);
    }
    dto.slug = urlSlug(dto.name);
    const categories: ProductCategory[] = [];
    for (const categoryId of dto.categoryIds) {
      const category =
        await this.productCategoryRepository.findOneEntity(categoryId);
      if (!category) {
        throw new NotFoundException('Category Not Found');
      }
      categories.push(category);
    }

    dto.categories = categories;
    if (dto.recommendation_product_id) {
      const product = await this.productRepository.findOneEntity(
        dto?.recommendation_product_id,
      );
      if (!product) {
        throw new NotFoundException('Recommended product Not Found');
      }
      dto.recommendation_product = product;
    }
    if (dto.product_tag_id) {
      const productTag = await this.productTagRepository.findOneEntity(
        dto?.product_tag_id,
      );
      if (!productTag) {
        throw new NotFoundException('Product tag Not Found');
      }
      dto.product_tag = productTag;
    }

    // product discount
    let discount_total_amount = 0;
    let price = dto.price ? dto.price : 0;
    let discount_amount = dto.discount_amount ? dto.discount_amount : 0;
    if (dto.discount_type != 'None' && discount_amount > 0) {
      if (dto.discount_type == 'Amount') {
        discount_total_amount = price - discount_amount;
      } else {
        discount_total_amount = price - (price * discount_amount) / 100;
      }
    }
    dto.discount_total_amount = discount_total_amount;
    if (files) {
      if (files.image) {
        const image: any = await this.doSpaceService.uploadFile(
          files.image[0],
          'Product/',
        );
        dto.image = image;
      }
      if (files.product_images) {
        
        const product_images_alt_text: ProductImages[] = [];
        for (let i = 0; i < files?.product_images?.length; i++) {
            const imgFile = files?.product_images[i];
            const productImageUrl: any = await this.doSpaceService.uploadFile(
              imgFile,
              'Product/',
            );
            const image_alt_text  = (dto.images_alt_text[i]) ? dto.images_alt_text[i] : "";
            product_images_alt_text.push({imageUrl:productImageUrl, altText:image_alt_text})
        }
        dto.product_images_alt_text = product_images_alt_text;
      
      }
    }
    delete dto.product_images;
    delete dto.images_alt_text;
    const data = await this.productRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(Constants.CREATE_FAILED);
    }
    await this.logService.createLog('Product added.');
    return ResponseUtils.successResponseHandler(
      201,
      'Successfully created data.',
      'data',
      data,
    );
  }

  async findAllByPagination(filterDto:FilterDto): Promise<Product[]> {
    const data = await this.productRepository.paginate(filterDto);
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
  async findAll(): Promise<Product[]> {
    const data = await this.productRepository.findAllProductList();
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

  async formData(): Promise<Product[]> {
    const product = await this.productRepository.findAll();
    const category =
        await this.productCategoryRepository.findAll();
    const productTag = await this.productTagRepository.findAll();

    const data = {product,category,productTag};
    
    return ResponseUtils.successResponseHandler(
      200,
      'Data fetched successfully',
      'data',
      data,
    );
  }

  async findOne(id: string): Promise<Product | null> {
    const data = await this.productRepository.findOneEntity(id);
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
    dto: UpdateProductDto,
    files: {
      image?: UploadedMulterFileI;
      product_images?: UploadedMulterFileI[];
    },
  ): Promise<Product | null> {
    const res = await this.productRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }
    const checkName = await this.productRepository.findOneByFilterQuery({
      name: dto.name,
      _id: { $ne: id },
    });
    if (checkName) {
      throw new BadRequestException(`Product name already exists!`);
    }
    const categories: ProductCategory[] = [];
    for (const categoryId of dto.categoryIds) {
      const category =
        await this.productCategoryRepository.findOneEntity(categoryId);
      if (!category) {
        throw new NotFoundException('Category Not Found');
      }
      categories.push(category);
    }

    dto.categories = categories;
    if (dto.recommendation_product_id) {
      const product = await this.productRepository.findOneEntity(
        dto?.recommendation_product_id,
      );
      if (!product) {
        throw new NotFoundException('Recommended product Not Found');
      }
      dto.recommendation_product = product;
    }else{
      dto.recommendation_product = null;
    }
    if (dto.product_tag_id) {
      const productTag = await this.productTagRepository.findOneEntity(
        dto?.product_tag_id,
      );
      if (!productTag) {
        throw new NotFoundException('Product tag Not Found');
      }
      dto.product_tag = productTag;
    }else{
      dto.product_tag = null;
    }

    // product discount
    let discount_total_amount = 0;
    let price = dto.price ? dto.price : 0;
    let discount_amount = dto.discount_amount ? dto.discount_amount : 0;
    if (dto.discount_type != 'None' && discount_amount > 0) {
      if (dto.discount_type == 'Amount') {
        discount_total_amount = price - discount_amount;
      } else {
        discount_total_amount = price - (price * discount_amount) / 100;
      }
    }
    dto.discount_total_amount = discount_total_amount;

    const db_image = (res as Product)?.image;
    const db_product_images_alt_text = (res as Product)?.product_images_alt_text;

    if (files) {
      if (files.image) {
        const image: any = await this.doSpaceService.uploadFile(
          files.image[0],
          'Product/',
        );
        dto.image = image;
      } else {
        dto.image = db_image;
      }
      if (files.product_images) {
        
        const product_images_alt_text: ProductImages[] = (dto.product_images_alt_text?.length>0) ? dto.product_images_alt_text : [];
        for (let i = 0; i < files?.product_images?.length; i++) {
            const imgFile = files?.product_images[i];
            const productImageUrl: any = await this.doSpaceService.uploadFile(
              imgFile,
              'Product/',
            );
            const image_alt_text  = (dto.images_alt_text[i]) ? dto.images_alt_text[i] : "";
            product_images_alt_text.push({imageUrl:productImageUrl, altText:image_alt_text})
        }
        dto.product_images_alt_text = product_images_alt_text;
      
      }

    } else {
      dto.image = db_image;
    }
    delete dto.product_images;
    delete dto.images_alt_text;
    const checkSlugInfo = await this.productRepository.findOneByFilterQuery({slug:dto?.slug});
    if(!checkSlugInfo){
      const slugDetailsData = {
        slug:res.slug,
        slug_id:id,
        type:'product'
      } as CreateSlugDetailsDto;
      await this.slugDetailsRepository.createEntity(slugDetailsData);
    }
    const data = await this.productRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(Constants.UPDATE_FAILED);
    }
    await this.logService.createLog('Product updated.');
    return ResponseUtils.successResponseHandler(
      200,
      'Data updated successfully',
      'data',
      data,
    );
  }

  async updateDragPosition(productIds:string[]): Promise<any> {
    if(productIds?.length>0){
      const productDataPromises = productIds.map(async (productId,key) => {
        let position = key+1;
        const positionData = {position:position} as UpdateProductDto;
        await this.productRepository.updateEntity(productId, positionData);
      });
    
      const productData = await Promise.all(productDataPromises);
    }
    return ResponseUtils.successResponseHandler(200, "Position updated successfully", "data", {});
  }

  async delete(id: string): Promise<void> {
    const res = await this.productRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }

    const data = await this.productRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(Constants.DELETE_FAILED);
    }
    await this.logService.createLog('Product deleted.');
    return ResponseUtils.buildDeletedData(
      data,
      200,
      'Data deleted successfully',
    );
  }
}
