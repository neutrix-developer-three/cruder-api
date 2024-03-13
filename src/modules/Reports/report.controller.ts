import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Constants } from "src/utils/constants";
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { ReportService } from './report.service';
import { SalesReportDto } from './dto/sales-report.dto';
import { ProfitReportDto } from './dto/profit-report.dto';
import { PaymentReportDto } from './dto/payment-report.dto';

@Controller({
    path: "report",
    version: Constants.API_VERSION_1
})
export class ReportController {
    constructor(private readonly service: ReportService) { }

    @Get('sales-report')
    @UseGuards(AdminAuthGuard)
    async getSalesReportData() {
        return await this.service.getSalesReportData();
    }
    @Post('sales-report')
    @UseGuards(AdminAuthGuard)
    async getFilterSalesReportData(@Body() dto:SalesReportDto) {
        return await this.service.getFilterSalesReportData(dto);
    }

    @Get('profit-report')
    @UseGuards(AdminAuthGuard)
    async getProfitReportData() {
        return await this.service.getProfitReportData();
    }

    @Post('profit-report')
    @UseGuards(AdminAuthGuard)
    async getFilterProfitReportData(@Body() dto:ProfitReportDto) {
        return await this.service.getFilterProfitReportData(dto);
    }

    @Get('payment-report')
    @UseGuards(AdminAuthGuard)
    async getPaymentReportData() {
        return await this.service.getPaymentReportData();
    }

    @Post('payment-report')
    @UseGuards(AdminAuthGuard)
    async getFilterPaymentReportData(@Body() dto:PaymentReportDto) {
        return await this.service.getFilterPaymentReportData(dto);
    }

    




}     
