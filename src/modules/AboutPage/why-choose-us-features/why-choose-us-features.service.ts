import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { WhyChooseUsFeatures } from './schema/why-choose-us-features.schema';
import { WhyChooseUsFeaturesRepository } from './why-choose-us-features.repository';
import { CreateWhyChooseUsFeaturesDto } from './dto/create-why-choose-us-features.dto';
import { UpdateWhyChooseUsFeaturesDto } from './dto/update-why-choose-us-features.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class WhyChooseUsFeaturesService {
  constructor(private readonly doSpaceService: DoSpacesService,
    private readonly logService: LogActivityService,
    @InjectModel('about_why_choose_us_features') private readonly whyChooseUsFeaturesModel: Model<WhyChooseUsFeatures>) { }

  private readonly whyChooseUsFeaturesRepository = new WhyChooseUsFeaturesRepository(this.whyChooseUsFeaturesModel);

  async create(dto: CreateWhyChooseUsFeaturesDto,
    files: {
      image?: UploadedMulterFileI
    }): Promise<WhyChooseUsFeatures> {
      if (files && files.image) {
        const image: any = await this.doSpaceService.uploadFile(files.image[0], "WhyChooseUsFeatures/");
        dto.image = image;
      }
    const data = await this.whyChooseUsFeaturesRepository.createEntity(dto);
    await this.logService.createLog('About choose us features added.');
    if (!data) {
      throw new BadRequestException(
        Constants.CREATE_FAILED,
      );
    }
    return ResponseUtils.successResponseHandler(201, "Successfully created data.", "data", data);
  }

  async findAll(pageParam?: string, limitParam?: string): Promise<WhyChooseUsFeatures[]> {
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    const data = await this.whyChooseUsFeaturesRepository.paginate(page,limit);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async findOne(id: string): Promise<WhyChooseUsFeatures | null> {
    const data = await this.whyChooseUsFeaturesRepository.findOneEntity(id);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async update(id: string, dto: UpdateWhyChooseUsFeaturesDto,
    files: {
      image?: UploadedMulterFileI
    }): Promise<WhyChooseUsFeatures | null> {
    const res = await this.whyChooseUsFeaturesRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    const foundImage = (res as WhyChooseUsFeatures)?.image;
    if (files && files.image) {
      const image: any = await this.doSpaceService.uploadFile(files.image[0], "WhyChooseUsFeatures/");
      dto.image = image;
    } else {
       dto.image = foundImage;
    }
    const data = await this.whyChooseUsFeaturesRepository.updateEntity(id, dto);
    await this.logService.createLog('About choose us features updated.');
    if (!data) {
      throw new BadRequestException(
        Constants.UPDATE_FAILED,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data updated successfully", "data", data);
  }

  async delete(id: string): Promise<void> {
    const res = await this.whyChooseUsFeaturesRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }

    const data = await this.whyChooseUsFeaturesRepository.deleteEntity(id);
    await this.logService.createLog('About choose us features deleted.');
    if (!data) {
      throw new BadRequestException(
        Constants.DELETE_FAILED,
      );
    }
    return ResponseUtils.buildDeletedData(data, 200, "Data deleted successfully");
  }
}