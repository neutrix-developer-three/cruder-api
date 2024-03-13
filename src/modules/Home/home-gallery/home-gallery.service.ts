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
import { HomeGalleryRepository } from './home-gallery.repository';
import { HomeGallery } from './schema/home-gallery.schema';
import { CreateHomeGalleryDto } from './dto/create-home-gallery.dto';
import { UpdateHomeGalleryDto } from './dto/update-home-gallery.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class HomeGalleryService {
  constructor(
    private readonly doSpaceService: DoSpacesService,
    @InjectModel('home_gallery')
    private readonly homeGalleryModel: Model<HomeGallery>,
    private readonly logService: LogActivityService
  ) {}

  private readonly homeGalleryRepository = new HomeGalleryRepository(
    this.homeGalleryModel,
  );

  async create(
    dto: CreateHomeGalleryDto,
    files: {
      image?: UploadedMulterFileI;
    },
  ): Promise<HomeGallery> {
    if (files && files.image) {
      const image: any = await this.doSpaceService.uploadFile(
        files.image[0],
        'HomeGallery/',
      );
      dto.image = image;
    }
    const data = await this.homeGalleryRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(Constants.CREATE_FAILED);
    }
    await this.logService.createLog('Home gallery added.');
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
  ): Promise<HomeGallery[]> {
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    const data = await this.homeGalleryRepository.paginate(page, limit);
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

  async findOne(id: string): Promise<HomeGallery | null> {
    const data = await this.homeGalleryRepository.findOneEntity(id);
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
    dto: UpdateHomeGalleryDto,
    files: {
      image?: UploadedMulterFileI;
    },
  ): Promise<HomeGallery | null> {
    const res = await this.homeGalleryRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }
    const foundImage = (res as HomeGallery)?.image;

    if (files && files.image) {
      const image: any = await this.doSpaceService.uploadFile(
        files.image[0],
        'HomeGallery/',
      );
      dto.image = image;
    } else {
      dto.image = foundImage;
    }
    const data = await this.homeGalleryRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(Constants.UPDATE_FAILED);
    }
    await this.logService.createLog('Home gallery updated.');
    return ResponseUtils.successResponseHandler(
      200,
      'Data updated successfully',
      'data',
      data,
    );
  }

  async delete(id: string): Promise<void> {
    const res = await this.homeGalleryRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }

    const data = await this.homeGalleryRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(Constants.DELETE_FAILED);
    }
    await this.logService.createLog('Home gallery deleted.');
    return ResponseUtils.buildDeletedData(
      data,
      200,
      'Data deleted successfully',
    );
  }
}
