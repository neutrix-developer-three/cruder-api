import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { FaqRepository } from './faq.repository';
import { CreateFaqDto } from './dto/create-faq.dto';
import { Faq } from './schema/faq.schema';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class FaqService {
  constructor(
    @InjectModel('faqs') private readonly faqModel: Model<Faq>,
    private readonly logService: LogActivityService,
  ) {}

  private readonly faqRepository = new FaqRepository(this.faqModel);

  async create(dto: CreateFaqDto): Promise<Faq> {
    const checkQuestion = await this.faqRepository.findOneByFilterQuery({
      question: dto.question,
    });
    if (checkQuestion) {
      throw new BadRequestException(`Faq question already exists!`);
    }

    const data = await this.faqRepository.createEntity(dto);
    if (!data) {
      throw new BadRequestException(Constants.CREATE_FAILED);
    }
    await this.logService.createLog('Faq added.');
    return ResponseUtils.successResponseHandler(
      201,
      'Successfully created data.',
      'data',
      data,
    );
  }

  async findAll(pageParam?: string, limitParam?: string): Promise<Faq[]> {
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    const data = await this.faqRepository.paginate(page, limit);
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

  async findOne(id: string): Promise<Faq | null> {
    const data = await this.faqRepository.findOneEntity(id);
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

  async update(id: string, dto: UpdateFaqDto): Promise<Faq | null> {
    const res = await this.faqRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }
    const checkQuestion = await this.faqRepository.findOneByFilterQuery({
      question: dto.question,
      _id: { $ne: id },
    });
    if (checkQuestion) {
      throw new BadRequestException(`Faq question already exists!`);
    }
    const data = await this.faqRepository.updateEntity(id, dto);
    if (!data) {
      throw new BadRequestException(Constants.UPDATE_FAILED);
    }
    await this.logService.createLog('Faq updated.');
    return ResponseUtils.successResponseHandler(
      200,
      'Data updated successfully',
      'data',
      data,
    );
  }

  async delete(id: string): Promise<void> {
    const res = await this.faqRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(Constants.NOT_FOUND);
    }

    const data = await this.faqRepository.deleteEntity(id);
    if (!data) {
      throw new BadRequestException(Constants.DELETE_FAILED);
    }
    await this.logService.createLog('Faq deleted.');
    return ResponseUtils.buildDeletedData(
      data,
      200,
      'Data deleted successfully',
    );
  }
}
