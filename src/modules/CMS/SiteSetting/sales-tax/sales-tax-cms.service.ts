import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { SalesTaxCms } from './schema/sales-tax-cms.schema';
import { SalesTaxCmsRepository } from './sales-tax-cms-repository';
import { UpdateSalesTaxCmsDto } from './dto/update-sales-tax-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class SalesTaxCmsService {
    constructor(
        @InjectModel('sales_taxes')
        private readonly salesTaxCmsModel: Model<SalesTaxCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly salesTaxCmsRepository = new SalesTaxCmsRepository(
        this.salesTaxCmsModel
    );

    async updateOrCreateData(
        dto: UpdateSalesTaxCmsDto
    ): Promise<SalesTaxCms | Error> {
        const isExists = await this.salesTaxCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.salesTaxCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Sales tax cms added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.salesTaxCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Sales tax cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<SalesTaxCms | Error> {
        const data = await this.salesTaxCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
