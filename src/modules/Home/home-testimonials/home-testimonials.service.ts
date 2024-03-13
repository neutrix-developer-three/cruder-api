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
import { HomeTestimonialsRepository } from './home-testimonials.repository';
import { HomeTestimonials } from './schema/home-testimonials.schema';
import { CreateHomeTestimonialsDto } from './dto/create-home-testimonials.dto';
import { UpdateHomeTestimonialsDto } from './dto/update-home-testimonials.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class HomeTestimonialsService {
  constructor(
    private readonly doSpaceService: DoSpacesService,
    @InjectModel('home_testimonials')
    private readonly homeTestimonialsModel: Model<HomeTestimonials>,
    private readonly logService: LogActivityService
  ) {}

  private readonly homeTestimonialsRepository = new HomeTestimonialsRepository(
    this.homeTestimonialsModel,
  );

  async create(
    dto: CreateHomeTestimonialsDto,
    files: {
      image?: UploadedMulterFileI;
    },
  ): Promise<HomeTestimonials> {
    if (files && files.image) {
      const image: any = await this.doSpaceService.uploadFile(
        files.image[0],
        'HomeTestimonials/',
      );
      dto.image = image;
    }
    const data = await this.homeTestimonialsRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(Constants.CREATE_FAILED);
    }
    await this.logService.createLog('Home testimonials added.');
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
  ): Promise<HomeTestimonials[]> {
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    const data = await this.homeTestimonialsRepository.paginate(page, limit);
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

  async findOne(id: string): Promise<HomeTestimonials | null> {
    const data = await this.homeTestimonialsRepository.findOneEntity(id);
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
    dto: UpdateHomeTestimonialsDto,
    files: {
      image?: UploadedMulterFileI;
    },
  ): Promise<HomeTestimonials | null> {
    const res = await this.homeTestimonialsRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }
    const foundImage = (res as HomeTestimonials)?.image;

    if (files && files.image) {
      const image: any = await this.doSpaceService.uploadFile(
        files.image[0],
        'HomeTestimonials/',
      );
      dto.image = image;
    } else {
      dto.image = foundImage;
    }
    const data = await this.homeTestimonialsRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(Constants.UPDATE_FAILED);
    }
    await this.logService.createLog('Home testimonials updated.');
    return ResponseUtils.successResponseHandler(
      200,
      'Data updated successfully',
      'data',
      data,
    );
  }

  async delete(id: string): Promise<void> {
    const res = await this.homeTestimonialsRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }

    const data = await this.homeTestimonialsRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(Constants.DELETE_FAILED);
    }
    await this.logService.createLog('Home testimonials deleted.');
    return ResponseUtils.buildDeletedData(
      data,
      200,
      'Data deleted successfully',
    );
  }
}
