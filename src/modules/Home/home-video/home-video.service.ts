import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { HomeVideoRepository } from './home-video.repository';
import { HomeVideo } from './schema/home-video.schema';
import { CreateHomeVideoDto } from './dto/create-home-video.dto';
import { UpdateHomeVideoDto } from './dto/update-home-video.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class HomeVideoService {
  constructor(private readonly doSpaceService: DoSpacesService,
    @InjectModel('home_video') private readonly homeVideoModel: Model<HomeVideo>,
    private readonly logService: LogActivityService) { }

  private readonly homeVideoRepository = new HomeVideoRepository(this.homeVideoModel);

  async create(dto: CreateHomeVideoDto,
    files: {
      image?: UploadedMulterFileI,
      video?:UploadedMulterFileI
    }): Promise<HomeVideo> {
      if (files) {
        if(files.image){
          const image: any = await this.doSpaceService.uploadFile(files.image[0], "HomeVideo/");
          dto.image = image;
        }
        if(files.video){
          const video: any = await this.doSpaceService.uploadFile(files.video[0], "HomeVideo/");
          dto.video = video;
        }
      }
    const data = await this.homeVideoRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(
        Constants.CREATE_FAILED,
      );
    }
    await this.logService.createLog('Home video added.');
    return ResponseUtils.successResponseHandler(201, "Successfully created data.", "data", data);
  }

  async findAll(pageParam?: string, limitParam?: string): Promise<HomeVideo[]> {
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    const data = await this.homeVideoRepository.paginate(page,limit);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async findOne(id: string): Promise<HomeVideo | null> {
    const data = await this.homeVideoRepository.findOneEntity(id);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async update(id: string, dto: UpdateHomeVideoDto,
    files: {
      image?: UploadedMulterFileI,
      video?: UploadedMulterFileI
    }): Promise<HomeVideo | null> {
    const res = await this.homeVideoRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    const foundImage = (res as HomeVideo)?.image;
    const foundVideo = (res as HomeVideo)?.video;

    if (files) {
      if(files.image){
        const image: any = await this.doSpaceService.uploadFile(files.image[0], "HomeVideo/");
        dto.image = image;
      }else{
        dto.image = foundImage;
      }
      if(files.video){
        const video: any = await this.doSpaceService.uploadFile(files.video[0], "HomeVideo/");
        dto.video = video;
      }else{
        dto.video = foundVideo;
      }
    }else{
      dto.image = foundImage;
      dto.video = foundVideo;
    }
    const data = await this.homeVideoRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(
        Constants.UPDATE_FAILED,
      );
    }
    await this.logService.createLog('Home video updated.');
    return ResponseUtils.successResponseHandler(200, "Data updated successfully", "data", data);
  }

  async delete(id: string): Promise<void> {
    const res = await this.homeVideoRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }

    const data = await this.homeVideoRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(
        Constants.DELETE_FAILED,
      );
    }
    await this.logService.createLog('Home video deleted.');
    return ResponseUtils.buildDeletedData(data, 200, "Data deleted successfully");
  }
}