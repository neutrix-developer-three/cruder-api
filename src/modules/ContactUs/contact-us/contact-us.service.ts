import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { ContactUs } from './schema/contact-us.schema';
import { ContactUsRepository } from './contact-us.repository';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class ContactUsService {
  constructor(
    @InjectModel('contact_us')
    private readonly contactUsModel: Model<ContactUs>,
    private readonly logService: LogActivityService
  ) {}

  private readonly contactUsRepository = new ContactUsRepository(
    this.contactUsModel,
  );

  async create(dto: CreateContactUsDto): Promise<ContactUs> {
    const data = await this.contactUsRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(Constants.CREATE_FAILED);
    }
    await this.logService.createLog('Contact us added.');
    return ResponseUtils.successResponseHandler(
      201,
      'Successfully created data.',
      'data',
      data,
    );
  }

  async findAll(pageParam?: string, limitParam?: string): Promise<ContactUs[]> {
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    const data = await this.contactUsRepository.paginate(page, limit);
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

  async findOne(id: string): Promise<ContactUs | null> {
    const data = await this.contactUsRepository.findOneEntity(id);
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

  async update(id: string, dto: UpdateContactUsDto): Promise<ContactUs | null> {
    const res = await this.contactUsRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }
    const data = await this.contactUsRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(Constants.UPDATE_FAILED);
    }
    await this.logService.createLog('Contact us updated.');
    return ResponseUtils.successResponseHandler(
      200,
      'Data updated successfully',
      'data',
      data,
    );
  }

  async delete(id: string): Promise<void> {
    const res = await this.contactUsRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }

    const data = await this.contactUsRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(Constants.DELETE_FAILED);
    }
    await this.logService.createLog('Contact us deleted.');
    return ResponseUtils.buildDeletedData(
      data,
      200,
      'Data deleted successfully',
    );
  }
}
