import { Controller, Get, Post, Body, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { SecretKeyCmsService } from './secret-key-cms.service';
import { UpdateSecretKeyCmsDto } from './dto/update-secret-key-cms.dto';

@Controller({ path: "secret-key-cms", version: Constants.API_VERSION_1 })
export class SecretKeyCmsController {
    constructor(private readonly service: SecretKeyCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'secret-key-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Body() dto: UpdateSecretKeyCmsDto) {
        return await this.service.updateOrCreateData(dto);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
