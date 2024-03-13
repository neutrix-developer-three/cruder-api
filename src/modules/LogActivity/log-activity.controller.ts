import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Constants } from "src/utils/constants";
import { LogActivityService } from './log-activity.service';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { LogFilterDto } from './dto/log-filter.dto';

@Controller({
    path: "log-activity",
    version: Constants.API_VERSION_1
})
export class LogActivityController {
    constructor(private readonly service: LogActivityService) { }

    @Get()
    @StaticRoutesProps({ routeName: 'log-activity' })
    @UseGuards(AdminAuthGuard)
    findAll(@Query() filterDto:LogFilterDto) {
        return this.service.findAll(filterDto);
    }

}     
