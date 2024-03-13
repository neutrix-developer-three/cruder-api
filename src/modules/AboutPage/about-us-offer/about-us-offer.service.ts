import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/utils/constants';
import { ResponseUtils } from 'src/utils/response.utils';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { AboutUsOfferRepository } from './about-us-offer.repository';
import { AboutUsOffer } from './schema/about-us-offer.schema';
import { CreateAboutUsOfferDto } from './dto/create-about-us-offer.dto';
import { UpdateAboutUsOfferDto } from './dto/update-about-us-offer.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class AboutUsOfferService {
  constructor(private readonly doSpaceService: DoSpacesService,
    private readonly logService: LogActivityService,
    @InjectModel('about_us_offer') private readonly aboutUsOfferModel: Model<AboutUsOffer>) { }

  private readonly aboutUsOfferRepository = new AboutUsOfferRepository(this.aboutUsOfferModel);

  async create(dto: CreateAboutUsOfferDto,
    files: {
      image?: UploadedMulterFileI
    }): Promise<AboutUsOffer> {
      if (files && files.image) {
        const image: any = await this.doSpaceService.uploadFile(files.image[0], "AboutUsOffer/");
        dto.image = image;
      }
    const data = await this.aboutUsOfferRepository.createEntity(dto);
    await this.logService.createLog('About us offer added.');
    if (!data) {
      throw new BadRequestException(
        Constants.CREATE_FAILED,
      );
    }
    return ResponseUtils.successResponseHandler(201, "Successfully created data.", "data", data);
  }

  async findAll(pageParam?: string, limitParam?: string): Promise<AboutUsOffer[]> {
    const page = parseInt(pageParam, 10) ? parseInt(pageParam, 10) : 1;
    const limit = parseInt(limitParam, 10) ? parseInt(limitParam, 10) : 10;
    const data = await this.aboutUsOfferRepository.paginate(page,limit);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async findOne(id: string): Promise<AboutUsOffer | null> {
    const data = await this.aboutUsOfferRepository.findOneEntity(id);
    if (!data) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
  }

  async update(id: string, dto: UpdateAboutUsOfferDto,
    files: {
      image?: UploadedMulterFileI
    }): Promise<AboutUsOffer | null> {
    const res = await this.aboutUsOfferRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }
    const foundImage = (res as AboutUsOffer)?.image;
    if (files && files.image) {
      const image: any = await this.doSpaceService.uploadFile(files.image[0], "AboutUsOffer/");
      dto.image = image;
    } else {
       dto.image = foundImage;
    }
    const data = await this.aboutUsOfferRepository.updateEntity(id, dto);
    await this.logService.createLog('About us offer updated.');
    if (!data) {
      throw new BadRequestException(
        Constants.UPDATE_FAILED,
      );
    }
    return ResponseUtils.successResponseHandler(200, "Data updated successfully", "data", data);
  }

  async delete(id: string): Promise<void> {
    const res = await this.aboutUsOfferRepository.findOneEntity(id);
    if (!res) {
      throw new NotFoundException(
        Constants.NOT_FOUND,
      );
    }

    const data = await this.aboutUsOfferRepository.deleteEntity(id);
    await this.logService.createLog('About us offer deleted.');
    if (!data) {
      throw new BadRequestException(
        Constants.DELETE_FAILED,
      );
    }
    return ResponseUtils.buildDeletedData(data, 200, "Data deleted successfully");
  }
}