import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { SubscribeEmailRepository } from './subscribe-email.repository';
import { SubscribeEmail } from './schema/subscribe-email.schema';
import { CreateSubscribeEmailDto } from './dto/create-subscribe-email';
import { UpdateSubscribeEmailDto } from './dto/update-subscribe-email.dto';
import { FilterDto } from 'src/core/filter.dto';

@Injectable()
export class SubscribeEmailService {
  constructor(
    @InjectModel('subscribe_email') private readonly SubscribeEmailModel: Model<SubscribeEmail>) { }

  private readonly subscribeEmailRepository = new SubscribeEmailRepository(this.SubscribeEmailModel);

  async create(dto: CreateSubscribeEmailDto): Promise<SubscribeEmail> {
    const data = await this.subscribeEmailRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(
        Constants.CREATE_FAILED,
      );
    }
    return ResponseUtils.successResponseHandler(201, "Successfully created data.", "data", data);
  }

  async findAll(filterDto:FilterDto): Promise<SubscribeEmail[]> {
    const data = await this.subscribeEmailRepository.paginate(filterDto);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async findOne(id: string): Promise<SubscribeEmail | null> {
    const data = await this.subscribeEmailRepository.findOneEntity(id);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async update(id: string, dto: UpdateSubscribeEmailDto): Promise<SubscribeEmail | null> {
    const res = await this.subscribeEmailRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    const data = await this.subscribeEmailRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(
        Constants.UPDATE_FAILED,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data updated successfully", "data", data);
  }

  async delete(id: string): Promise<void> {
    const res = await this.subscribeEmailRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }

    const data = await this.subscribeEmailRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(
        Constants.DELETE_FAILED,
      );
    }
    return ResponseUtils.buildDeletedData(data, 200, "Data deleted successfully");
  }
}