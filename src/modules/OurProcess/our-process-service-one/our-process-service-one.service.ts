import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { OurProcessServiceOne } from './schema/our-process-service-one.schema';
import { OurProcessServiceOneRepository } from './our-process-service-one.repository';
import { CreateOurProcessServiceOneDto } from './dto/create-our-process-service-one.dto';
import { UpdateOurProcessServiceOneDto } from './dto/update-our-process-service-one.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';


@Injectable()
export class OurProcessServiceOneService {
  constructor(private readonly doSpaceService: DoSpacesService,
    @InjectModel('our_process_service_one') private readonly OurProcessServiceOneModel: Model<OurProcessServiceOne>,
    private readonly logService: LogActivityService) { }

  private readonly OurProcessServiceOneRepository = new OurProcessServiceOneRepository(this.OurProcessServiceOneModel);

  async create(dto: CreateOurProcessServiceOneDto,
    files: {
      image?: UploadedMulterFileI
    }): Promise<OurProcessServiceOne> {
      if (files && files.image) {
        const image: any = await this.doSpaceService.uploadFile(files.image[0], "OurProcessServiceOne/");
        dto.image = image;
      }
    const data = await this.OurProcessServiceOneRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(
        Constants.CREATE_FAILED,
      );
    }
    await this.logService.createLog('Our process service one added.');
    return ResponseUtils.successResponseHandler(201, "Successfully created data.", "data", data);
  }

  async findAll(pageParam?: string, limitParam?: string): Promise<OurProcessServiceOne[]> {
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    const data = await this.OurProcessServiceOneRepository.paginate(page,limit);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async findOne(id: string): Promise<OurProcessServiceOne | null> {
    const data = await this.OurProcessServiceOneRepository.findOneEntity(id);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async update(id: string, dto: UpdateOurProcessServiceOneDto,
    files: {
      image?: UploadedMulterFileI
    }): Promise<OurProcessServiceOne | null> {
    const res = await this.OurProcessServiceOneRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    const foundImage = (res as OurProcessServiceOne)?.image;
    if (files && files.image) {
      const image: any = await this.doSpaceService.uploadFile(files.image[0], "OurProcessServiceOne/");
      dto.image = image;
    } else {
       dto.image = foundImage;
    }
    const data = await this.OurProcessServiceOneRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(
        Constants.UPDATE_FAILED,
      );
    }
    await this.logService.createLog('Our process service one updated.');
    return ResponseUtils.successResponseHandler(200, "Data updated successfully", "data", data);
  }

  async delete(id: string): Promise<void> {
    const res = await this.OurProcessServiceOneRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }

    const data = await this.OurProcessServiceOneRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(
        Constants.DELETE_FAILED,
      );
    }
    await this.logService.createLog('Our process service one deleted.');
    return ResponseUtils.buildDeletedData(data, 200, "Data deleted successfully");
  }
}