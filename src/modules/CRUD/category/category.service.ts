import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { urlSlug } from 'src/utils/common-helper';

@Injectable()
export class CategoryService {
  constructor(private readonly doSpaceService: DoSpacesService,
    @InjectModel('Category') private readonly categoryModel: Model<Category>) { }

  private readonly categoryRepository = new CategoryRepository(this.categoryModel);

  async create(dto: CreateCategoryDto,
    files: {
      icon?: UploadedMulterFileI
    }): Promise<Category> {
      if (files && files.icon) {
        const image: any = await this.doSpaceService.uploadFile(files.icon[0], "category/");
        dto.icon = image;
      }
    dto.urlSlug = urlSlug(dto.title)
    const data = await this.categoryRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(
        Constants.CREATE_FAILED,
      );
    }
    return ResponseUtils.successResponseHandler(201, "Successfully subscribed to category.", "data", data);
  }

  async findAll(): Promise<Category[]> {
    const data = await this.categoryRepository.findAll();
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async findOne(id: string): Promise<Category | null> {
    const data = await this.categoryRepository.findOneEntity(id);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async update(id: string, dto: UpdateCategoryDto,
    files: {
      icon?: UploadedMulterFileI
    }): Promise<Category | null> {
    const res = await this.categoryRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    const foundImage = (res as Category)?.icon;
    if (files && files.icon) {
      const image: any = await this.doSpaceService.uploadFile(files.icon[0], "category/");
      dto.icon = image;
    } else {
       dto.icon = foundImage;
    }
    dto.urlSlug = urlSlug(dto.title)
    const data = await this.categoryRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(
        Constants.UPDATE_FAILED,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data updated successfully", "data", data);
  }

  async delete(id: string): Promise<void> {
    const res = await this.categoryRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }

    const data = await this.categoryRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(
        Constants.DELETE_FAILED,
      );
    }
    return ResponseUtils.buildDeletedData(data, 200, "Data deleted successfully");
  }
}