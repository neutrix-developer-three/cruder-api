import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { BlogRepository } from './blog.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './schema/blog.schema';
import { urlSlug } from 'src/utils/common-helper';
import { FilterDto } from 'src/core/filter.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';
import { SlugDetails } from 'src/modules/Product/product-category/schema/slug-details.schema';
import { SlugDetailsRepository } from 'src/modules/Product/product-category/slug-details.repository';
import { CreateSlugDetailsDto } from 'src/modules/Product/product-category/dto/create-slug-details.dto';

@Injectable()
export class BlogService {
  constructor(private readonly doSpaceService: DoSpacesService,
    private readonly logService: LogActivityService,
    @InjectModel('blogs') private readonly blogModel: Model<Blog>,
    @InjectModel('slug_details') private readonly slugDetailsModel: Model<SlugDetails>,) { }

  private readonly blogRepository = new BlogRepository(this.blogModel);
  private readonly slugDetailsRepository = new SlugDetailsRepository(this.slugDetailsModel);

  async create(dto: CreateBlogDto,
    files: {
      image?: UploadedMulterFileI
    }): Promise<Blog> {

      const checkTitle = await this.blogRepository.findOneByFilterQuery({
        title: dto.title,
      });
      if (checkTitle) {
        throw new BadRequestException(`Blog title already exists!`);
      }

      dto.slug = urlSlug(dto.title);

      if (files && files.image) {
        const image: any = await this.doSpaceService.uploadFile(files.image[0], "Blog/");
        dto.image = image;
      }
    const data = await this.blogRepository.createEntity(dto);
    await this.logService.createLog('Blog added.');
    if (!data) {
      throw new BadRequestException(
        Constants.CREATE_FAILED,
      );
    }
    return ResponseUtils.successResponseHandler(201, "Successfully created data.", "data", data);
  }

  async findAll(filterDto:FilterDto): Promise<Blog[]> {
    const data = await this.blogRepository.paginate(filterDto);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async findOne(id: string): Promise<Blog | null> {
    const data = await this.blogRepository.findOneEntity(id);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async update(id: string, dto: UpdateBlogDto,
    files: {
      image?: UploadedMulterFileI
    }): Promise<Blog | null> {
    const res = await this.blogRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    const checkTitle = await this.blogRepository.findOneByFilterQuery({
      title: dto.title,
      _id: { $ne: id }
    });
    if (checkTitle) {
      throw new BadRequestException(`Blog title already exists!`);
    }
    const foundImage = (res as Blog)?.image;
    if (files && files.image) {
      const image: any = await this.doSpaceService.uploadFile(files.image[0], "Blog/");
      dto.image = image;
    } else {
       dto.image = foundImage;
    }
    const checkSlugInfo = await this.blogRepository.findOneByFilterQuery({slug:dto?.slug});
    if(!checkSlugInfo){
      const slugDetailsData = {
        slug:res.slug,
        slug_id:id,
        type:'blog'
      } as CreateSlugDetailsDto;
      await this.slugDetailsRepository.createEntity(slugDetailsData);
    }
    const data = await this.blogRepository.updateEntity(id, dto);
    await this.logService.createLog('Blog updated.');
    if (!data) {
      throw new BadRequestException(
        Constants.UPDATE_FAILED,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data updated successfully", "data", data);
  }

  async delete(id: string): Promise<void> {
    const res = await this.blogRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }

    const data = await this.blogRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(
        Constants.DELETE_FAILED,
      );
    }
    await this.logService.createLog('Blog deleted.');
    return ResponseUtils.buildDeletedData(data, 200, "Data deleted successfully");
  }
}