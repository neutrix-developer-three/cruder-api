import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { HomeIntroRepository } from './home-intro.repository';
import { HomeIntro } from './schema/home-intro.schema';
import { CreateHomeIntroDto } from './dto/create-home-intro.dto';
import { UpdateHomeIntroDto } from './dto/update-home-intro.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class HomeIntroService {
  constructor(private readonly doSpaceService: DoSpacesService,
    @InjectModel('home_intro') private readonly homeIntroModel: Model<HomeIntro>,
    private readonly logService: LogActivityService) { }

  private readonly homeIntroRepository = new HomeIntroRepository(this.homeIntroModel);

  async create(dto: CreateHomeIntroDto,
    files: {
      image?: UploadedMulterFileI,
      background_image?:UploadedMulterFileI
    }): Promise<HomeIntro> {
      if (files) {
        if(files.image){
          const image: any = await this.doSpaceService.uploadFile(files.image[0], "HomeIntro/");
          dto.image = image;
        }
        if(files.background_image){
          const background_image: any = await this.doSpaceService.uploadFile(files.background_image[0], "HomeIntro/");
          dto.background_image = background_image;
        }
      }
    const data = await this.homeIntroRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(
        Constants.CREATE_FAILED,
      );
    }
    await this.logService.createLog('Home intro added.');
    return ResponseUtils.successResponseHandler(201, "Successfully created data.", "data", data);
  }

  async findAll(pageParam?: string, limitParam?: string): Promise<HomeIntro[]> {
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    const data = await this.homeIntroRepository.paginate(page,limit);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async findOne(id: string): Promise<HomeIntro | null> {
    const data = await this.homeIntroRepository.findOneEntity(id);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async update(id: string, dto: UpdateHomeIntroDto,
    files: {
      image?: UploadedMulterFileI,
      background_image?: UploadedMulterFileI
    }): Promise<HomeIntro | null> {
    const res = await this.homeIntroRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    const foundImage = (res as HomeIntro)?.image;
    const foundBackgroundImage = (res as HomeIntro)?.background_image;

    if (files) {
      if(files.image){
        const image: any = await this.doSpaceService.uploadFile(files.image[0], "HomeIntro/");
        dto.image = image;
      }else{
        dto.image = foundImage;
      }
      if(files.background_image){
        const background_image: any = await this.doSpaceService.uploadFile(files.background_image[0], "HomeIntro/");
        dto.background_image = background_image;
      }else{
        dto.background_image = foundBackgroundImage;
      }
    }else{
      dto.image = foundImage;
      dto.background_image = foundBackgroundImage;
    }
    const data = await this.homeIntroRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(
        Constants.UPDATE_FAILED,
      );
    }
    await this.logService.createLog('Home intro updated.');
    return ResponseUtils.successResponseHandler(200, "Data updated successfully", "data", data);
  }

  async delete(id: string): Promise<void> {
    const res = await this.homeIntroRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }

    const data = await this.homeIntroRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(
        Constants.DELETE_FAILED,
      );
    }
    await this.logService.createLog('Home intro deleted.');
    return ResponseUtils.buildDeletedData(data, 200, "Data deleted successfully");
  }
}