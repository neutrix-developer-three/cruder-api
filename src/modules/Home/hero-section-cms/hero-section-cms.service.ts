import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { HeroSectionCms } from './schema/hero-section-cms.schema';
import { HeroSectionCmsRepository } from './hero-section-cms-repository';
import { UpdateHeroSectionCmsDto } from './dto/update-hero-section-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class HeroSectionCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        @InjectModel('hero_section_cms')
        private readonly heroSectionCmsModel: Model<HeroSectionCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly heroSectionCmsRepository = new HeroSectionCmsRepository(
        this.heroSectionCmsModel
    );

    async updateOrCreateData(
        dto: UpdateHeroSectionCmsDto,
        files: {
            image?: UploadedMulterFileI
        }
    ): Promise<HeroSectionCms | Error> {
        if(files && files.image){
            const image: any = await this.doSpaceService.uploadFile(files.image[0], "HeroSectionCms/");
            dto.image = image;
        }
        const isExists = await this.heroSectionCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.heroSectionCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Hero section cms added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.heroSectionCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Hero section cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<HeroSectionCms | Error> {
        const data = await this.heroSectionCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
