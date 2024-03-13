import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { urlSlug } from 'src/utils/common-helper';
import { ProductCategoryRepository } from './product-category.repository';
import { ProductCategory } from './schema/product-category.schema';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';
import { SlugDetails } from './schema/slug-details.schema';
import { SlugDetailsRepository } from './slug-details.repository';
import { CreateSlugDetailsDto } from './dto/create-slug-details.dto';

@Injectable()
export class ProductCategoryService {
  constructor(private readonly doSpaceService: DoSpacesService,
    @InjectModel('product_categories') private readonly productCategoryModel: Model<ProductCategory>,
    @InjectModel('slug_details') private readonly slugDetailsModel: Model<SlugDetails>,
    private readonly logService: LogActivityService) { }

    private readonly productCategoryRepository = new ProductCategoryRepository(this.productCategoryModel);
    private readonly slugDetailsRepository = new SlugDetailsRepository(this.slugDetailsModel);

  async create(dto: CreateProductCategoryDto,
    files: {
      banner_image?: UploadedMulterFileI
    }): Promise<ProductCategory> {
      if(!dto.position){
        let position = 1;
          const maxPositionData = await this.productCategoryRepository.findMaxPositionEntity();
          if(maxPositionData?.position){
            console.log('found')
            position=maxPositionData.position+1;
          }
          dto.position=position;
      }
      console.log('dto ', dto);
      const checkName = await this.productCategoryRepository.findOneByFilterQuery({
        name: dto.name,
      });
      if (checkName) {
        throw new BadRequestException(`Product Category name already exists!`);
      }
      dto.slug = urlSlug(dto.name);
      if(dto.categoryId){
        const category = await this.productCategoryRepository.findOneEntity(dto?.categoryId);
        if (!category) {
            throw new NotFoundException(
                "Category Not Found"
            );
        }
        dto.category=category;
      }

      if (files && files.banner_image) {
        const banner_image: any = await this.doSpaceService.uploadFile(files.banner_image[0], "ProductCategory/");
        dto.banner_image = banner_image;
      }
    const data = await this.productCategoryRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(
        Constants.CREATE_FAILED,
      );
    }
    await this.logService.createLog('Product category added.');
    return ResponseUtils.successResponseHandler(201, "Successfully created data.", "data", data);
  }

  async findAllPaginate(pageParam?: string, limitParam?: string): Promise<ProductCategory[]> {
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    const data = await this.productCategoryRepository.paginate(page,limit);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }
  async findAll(): Promise<ProductCategory[]> {
    const data = await this.productCategoryRepository.findAll();
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async updateDragPosition(categoryIds:string[]): Promise<any> {
    if(categoryIds?.length>0){
      const categoryDataPromises = categoryIds.map(async (cateId,key) => {
        let position = key+1;
        const positionData = {position:position} as UpdateProductCategoryDto;
        await this.productCategoryRepository.updateEntity(cateId, positionData);
      });
    
      const categoryData = await Promise.all(categoryDataPromises);
    }
    return ResponseUtils.successResponseHandler(200, "Position updated successfully", "data", {});
  }
  
  async formData(): Promise<ProductCategory[]> {
    const data = await this.productCategoryRepository.findAll();
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }


  async findOne(id: string): Promise<ProductCategory | null> {
    const data = await this.productCategoryRepository.findOneEntity(id);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async update(id: string, dto: UpdateProductCategoryDto,
    files: {
      banner_image?: UploadedMulterFileI
    }): Promise<ProductCategory | null> {
    const res = await this.productCategoryRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    const checkName = await this.productCategoryRepository.findOneByFilterQuery({
      name: dto.name,
      _id: { $ne: id }
    });
    if (checkName) {
      throw new BadRequestException(`ProductCategory name already exists!`);
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
    const checkSlugInfo = await this.productCategoryRepository.findOneByFilterQuery({slug:dto?.slug});
    if(!checkSlugInfo){
      const slugDetailsData = {
        slug:res.slug,
        slug_id:id,
        type:'category'
      } as CreateSlugDetailsDto;
      await this.slugDetailsRepository.createEntity(slugDetailsData);
    }
    const foundImage = (res as ProductCategory)?.banner_image;
    if (files && files.banner_image) {
      const banner_image: any = await this.doSpaceService.uploadFile(files.banner_image[0], "ProductCategory/");
      dto.banner_image = banner_image;
    } else {
       dto.banner_image = foundImage;
    }
    const data = await this.productCategoryRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(
        Constants.UPDATE_FAILED,
      );
    }
    await this.logService.createLog('Product category updated.');
    return ResponseUtils.successResponseHandler(200, "Data updated successfully", "data", data);
  }

  async delete(id: string): Promise<void> {
    const res = await this.productCategoryRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }

    const data = await this.productCategoryRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(
        Constants.DELETE_FAILED,
      );
    }
    await this.logService.createLog('Product category deleted.');
    return ResponseUtils.buildDeletedData(data, 200, "Data deleted successfully");
  }
}