import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { SecretKeyCms } from './schema/secret-key-cms.schema';
import { SecretKeyCmsRepository } from './secret-key-cms-repository';
import { UpdateSecretKeyCmsDto } from './dto/update-secret-key-cms.dto';
import { LogActivityService } from 'src/modules/LogActivity/log-activity.service';

@Injectable()
export class SecretKeyCmsService {
    constructor(
        @InjectModel('secret_keys')
        private readonly secretKeyCmsModel: Model<SecretKeyCms>,
        private readonly logService: LogActivityService
    ) { }

    private readonly secretKeyCmsRepository = new SecretKeyCmsRepository(
        this.secretKeyCmsModel
    );

    async updateOrCreateData(
        dto: UpdateSecretKeyCmsDto
    ): Promise<SecretKeyCms | Error> {
        const isExists = await this.secretKeyCmsRepository.findOneByFilterQuery({
            isDeleted: false
        });
        if (!isExists) {
            const data = await this.secretKeyCmsRepository.createEntity(dto);
            if (!data) {
                throw new BadRequestException(`Failed to create data!`);
            }
            await this.logService.createLog('Secret key cms added.');
            return ResponseUtils.successResponseHandler(
                201,
                'Data created successfully!',
                'data',
                data
            );
        } else {
            const id = isExists?._id.toString();
            const data = await this.secretKeyCmsRepository.updateEntity(id, dto);
            if (!data) {
                throw new BadRequestException(`Failed to update data!`);
            }
            await this.logService.createLog('Secret key cms updated.');
            return ResponseUtils.successResponseHandler(
                200,
                'Data updated successfully!',
                'data',
                data
            );
        }
    }

    async findOneEntity(): Promise<SecretKeyCms | Error> {
        const data = await this.secretKeyCmsRepository.findOneEntity();
        if (!data) {
            throw new NotFoundException(Constants.NOT_FOUND);
        }
        return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
    }


}
