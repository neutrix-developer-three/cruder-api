import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { AuthorizePaymentConfigCms } from './schema/authorize-payment-config-cms.schema';
import { AuthorizePaymentConfigCmsRepository } from './authorize-payment-config-cms-repository';
import { UpdateAuthorizePaymentConfigCmsDto } from './dto/update-authorize-payment-config-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class AuthorizePaymentConfigCmsService {
    constructor(
        @InjectModel('authorize_payment_configs')
        private readonly authorizeConfigCmsModel: Model<AuthorizePaymentConfigCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly authorizePaymentConfigCmsRepository = new AuthorizePaymentConfigCmsRepository(
        this.authorizeConfigCmsModel
    );

    async updateOrCreateData(
        dto: UpdateAuthorizePaymentConfigCmsDto
    ): Promise<AuthorizePaymentConfigCms | Error> {
        const isExists = await this.authorizePaymentConfigCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.authorizePaymentConfigCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.authorizePaymentConfigCmsRepository.updateEntity(id, dto);
            await this.logService.createLog('Authorize net payment updated.');
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<AuthorizePaymentConfigCms | Error> {
        const data = await this.authorizePaymentConfigCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
