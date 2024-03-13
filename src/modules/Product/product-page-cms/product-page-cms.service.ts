import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { DoSpacesService } from 'src/modules/SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from 'src/modules/SpacesModule/SpacesService';
import { ProductPageCmsRepository } from './product-page-cms-repository';
import { ProductPageCms } from './schema/product-page-cms.schema';
import { UpdateProductPageCmsDto } from './dto/update-product-page-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class ProductPageCmsService {
    constructor(
        private readonly doSpaceService: DoSpacesService,
        @InjectModel('product_page_cms')
        private readonly productPageCmsModel: Model<ProductPageCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly productPageCmsRepository = new ProductPageCmsRepository(
        this.productPageCmsModel
    );

    async updateOrCreateData(
        dto: UpdateProductPageCmsDto,
        files: {
            banner_image?: UploadedMulterFileI,
        }
    ): Promise<ProductPageCms | Error> {
        if (files && files.banner_image) {    
            const banner_image: any = await this.doSpaceService.uploadFile(files.banner_image[0], "ProductPageCMS/");
            dto.banner_image = banner_image;           
        }
        const isExists = await this.productPageCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.productPageCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Product page cms added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.productPageCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Product page cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<ProductPageCms | Error> {
        const data = await this.productPageCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
