import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { HomeProgressWrapsRepository } from './home-progress-wraps.repository';
import { HomeProgressWraps } from './schema/home-progress-wraps.schema';
import { CreateHomeProgressWrapsDto } from './dto/create-home-progress-wraps.dto';
import { UpdateHomeProgressWrapsDto } from './dto/update-home-progress-wraps.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class HomeProgressWrapsService {
  constructor(
    @InjectModel('home_progress_wraps')
    private readonly homeProgressWrapsModel: Model<HomeProgressWraps>,
    private readonly logService: LogActivityService
  ) {}

  private readonly homeProgressWrapsRepository = new HomeProgressWrapsRepository(
    this.homeProgressWrapsModel,
  );

  async create(
    dto: CreateHomeProgressWrapsDto
  ): Promise<HomeProgressWraps> {
    const data = await this.homeProgressWrapsRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(Constants.CREATE_FAILED);
    }
    await this.logService.createLog('home progress wraps added.');
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
  ): Promise<HomeProgressWraps[]> {
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    const data = await this.homeProgressWrapsRepository.paginate(page, limit);
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

  async findOne(id: string): Promise<HomeProgressWraps | null> {
    const data = await this.homeProgressWrapsRepository.findOneEntity(id);
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
    dto: UpdateHomeProgressWrapsDto
  ): Promise<HomeProgressWraps | null> {
    const res = await this.homeProgressWrapsRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }
    const data = await this.homeProgressWrapsRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(Constants.UPDATE_FAILED);
    }
    await this.logService.createLog('home progress wraps updated.');
    return ResponseUtils.successResponseHandler(
      200,
      'Data updated successfully',
      'data',
      data,
    );
  }

  async delete(id: string): Promise<void> {
    const res = await this.homeProgressWrapsRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }

    const data = await this.homeProgressWrapsRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(Constants.DELETE_FAILED);
    }
    await this.logService.createLog('home progress wraps deleted.');
    return ResponseUtils.buildDeletedData(
      data,
      200,
      'Data deleted successfully',
    );
  }
}
