import { Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { ContactPageComponentUiCmsService } from './contact-page-component-ui-cms.service';
import { UpdateContactPageComponentUiCmsDto } from './dto/update-contact-page-component-ui-cms.dto';

@Controller({ path: "contact-page-component-ui-cms", version: Constants.API_VERSION_1 })
export class ContactPageComponentUiCmsController {
    constructor(private readonly service: ContactPageComponentUiCmsService) { }

    @Post()
    @StaticRoutesProps({ routeName: 'contact-page-component-ui-cms' })
    @UseGuards(AdminAuthGuard)
    async updateOrCreateData(@Body() dto: UpdateContactPageComponentUiCmsDto) {
        return await this.service.updateOrCreateData(dto);
    }

    @Get()
    async findOneEntity() {
        return await this.service.findOneEntity();
    }
}
