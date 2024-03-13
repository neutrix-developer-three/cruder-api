import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Constants } from "src/utils/constants";
import { AuthGuard } from 'src/core/guards/auth.guard';
import { DashboardService } from './dashboard.service';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';

@Controller({
    path: "admin-dashboard",
    version: Constants.API_VERSION_1
})
export class DashboardController {
    constructor(private readonly service: DashboardService) { }

    @Get()
    @UseGuards(AdminAuthGuard)
    async getAdminDashboardData() {
        return await this.service.getAdminDashboardData();
    }

    




}     
