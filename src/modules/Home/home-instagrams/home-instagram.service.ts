import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { HomeInstagramRepository } from './home-instagram.repository';
import { FilterDto } from 'src/core/filter.dto';
import { HomeInstagram } from './schema/home-instagram.schema';
import { CreateHomeInstagramDto } from './dto/create-home-instagram.dto';
import { UpdateHomeInstagramDto } from './dto/update-home-instagram.dto';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class HomeInstagramService {
  constructor(
    private readonly doSpaceService: DoSpacesService,
    @InjectModel('home_instagram') private readonly homeInstagramModel: Model<HomeInstagram>,
    private readonly logService: LogActivityService) { }

  private readonly homeInstagramRepository = new HomeInstagramRepository(this.homeInstagramModel);

  async create(dto: CreateHomeInstagramDto,
    files: {
      media_url?: UploadedMulterFileI;
    }): Promise<HomeInstagram> {
      if (files && files.media_url) {
        const media_url: any = await this.doSpaceService.uploadFile(
          files.media_url[0],
          'HomeInstagram/',
        );
        dto.media_url = media_url;
      }
    const data = await this.homeInstagramRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(
        Constants.CREATE_FAILED,
      );
    }
    await this.logService.createLog('Home instagram service added');
    return ResponseUtils.successResponseHandler(201, "Successfully created data.", "data", data);
  }

  async findAll(filterDto:FilterDto): Promise<HomeInstagram[]> {
    const data = await this.homeInstagramRepository.paginate(filterDto);
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
  async findOne(id: string): Promise<HomeInstagram | null> {
    const data = await this.homeInstagramRepository.findOneEntity(id);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async update(id: string, dto: UpdateHomeInstagramDto,files: {
    media_url?: UploadedMulterFileI;
  },): Promise<HomeInstagram | null> {
    const res = await this.homeInstagramRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    const foundImage = (res as HomeInstagram)?.media_url;

    if (files && files.media_url) {
      const media_url: any = await this.doSpaceService.uploadFile(
        files.media_url[0],
        'HomeInstagram/',
      );
      dto.media_url = media_url;
    }else{
      dto.media_url = foundImage;
    }

    const data = await this.homeInstagramRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(
        Constants.UPDATE_FAILED,
      );
    }
    await this.logService.createLog('Home instagram service updated');
    return ResponseUtils.successResponseHandler(200, "Data updated successfully", "data", data);
  }

  async delete(id: string): Promise<void> {
    const res = await this.homeInstagramRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }

    const data = await this.homeInstagramRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(
        Constants.DELETE_FAILED,
      );
    }
    await this.logService.createLog('Home instagram service deleted');
    return ResponseUtils.buildDeletedData(data, 200, "Data deleted successfully");
  }
}