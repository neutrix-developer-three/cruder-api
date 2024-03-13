import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { OurProcessServiceTwo } from './schema/our-process-service-two.schema';
import { OurProcessServiceTwoRepository } from './our-process-service-two.repository';
import { CreateOurProcessServiceTwoDto } from './dto/create-our-process-service-two.dto';
import { UpdateOurProcessServiceTwoDto } from './dto/update-our-process-service-two.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';


@Injectable()
export class OurProcessServiceTwoService {
  constructor(private readonly doSpaceService: DoSpacesService,
    @InjectModel('our_process_service_two') private readonly OurProcessServiceTwoModel: Model<OurProcessServiceTwo>,
    private readonly logService: LogActivityService) { }

  private readonly OurProcessServiceTwoRepository = new OurProcessServiceTwoRepository(this.OurProcessServiceTwoModel);

  async create(dto: CreateOurProcessServiceTwoDto,
    files: {
      image?: UploadedMulterFileI
    }): Promise<OurProcessServiceTwo> {
      if (files && files.image) {
        const image: any = await this.doSpaceService.uploadFile(files.image[0], "OurProcessServiceTwo/");
        dto.image = image;
      }
    const data = await this.OurProcessServiceTwoRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(
        Constants.CREATE_FAILED,
      );
    }
    await this.logService.createLog('Our process service two added.');
    return ResponseUtils.successResponseHandler(201, "Successfully created data.", "data", data);
  }

  async findAll(pageParam?: string, limitParam?: string): Promise<OurProcessServiceTwo[]> {
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    const data = await this.OurProcessServiceTwoRepository.paginate(page,limit);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async findOne(id: string): Promise<OurProcessServiceTwo | null> {
    const data = await this.OurProcessServiceTwoRepository.findOneEntity(id);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async update(id: string, dto: UpdateOurProcessServiceTwoDto,
    files: {
      image?: UploadedMulterFileI
    }): Promise<OurProcessServiceTwo | null> {
    const res = await this.OurProcessServiceTwoRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    const foundImage = (res as OurProcessServiceTwo)?.image;
    if (files && files.image) {
      const image: any = await this.doSpaceService.uploadFile(files.image[0], "OurProcessServiceTwo/");
      dto.image = image;
    } else {
       dto.image = foundImage;
    }
    const data = await this.OurProcessServiceTwoRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(
        Constants.UPDATE_FAILED,
      );
    }
    await this.logService.createLog('Our process service two updated.');
    return ResponseUtils.successResponseHandler(200, "Data updated successfully", "data", data);
  }

  async delete(id: string): Promise<void> {
    const res = await this.OurProcessServiceTwoRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }

    const data = await this.OurProcessServiceTwoRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(
        Constants.DELETE_FAILED,
      );
    }
    await this.logService.createLog('Our process service two deleted.');
    return ResponseUtils.buildDeletedData(data, 200, "Data deleted successfully");
  }
}