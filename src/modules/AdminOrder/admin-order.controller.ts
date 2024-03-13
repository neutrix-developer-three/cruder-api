import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Constants } from "src/utils/constants";
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { AdminOrderService } from './admin-order.service';
import { FilterDto } from 'src/core/filter.dto';
import { StaticRoutesProps } from 'src/core/decorators/static-routes-props.decorator';
import { UpdateOrderDto } from '../Order/dto/update-order.dto';
import { CreateAdminOrderDto } from './dto/create-admin-order.dto';
import { InvoiceRefundDto } from './dto/invoice-refund.dto';

@Controller({
    path: "admin-order",
    version: Constants.API_VERSION_1
})
export class AdminOrderController {
    constructor(private readonly service: AdminOrderService) { }

    @Post() 
    @UseGuards(AdminAuthGuard)
    create(@Body() dto: CreateAdminOrderDto) {
        return this.service.create(dto);
    }

    @Get('form-data')
    @StaticRoutesProps({ routeName: 'admin-order/form-data' })
    @UseGuards(AdminAuthGuard)
    formData() {
        return this.service.formData();
    }


    @Get()
    @UseGuards(AdminAuthGuard)
    @StaticRoutesProps({ routeName: 'admin-order' })
    async findAll(@Query() filterDto:FilterDto) {
        return await this.service.findAll(filterDto);
    }

    @Get('/details/:orderId')
    @UseGuards(AdminAuthGuard)
    @StaticRoutesProps({ routeName: 'admin-order' })
    async findAdminOrderDetails(@Param("orderId") orderId: string) {
        return await this.service.findAdminOrderDetails(orderId);
    }

    @Patch('/update-status/:id')
    @UseGuards(AdminAuthGuard)
    @StaticRoutesProps({ routeName: 'admin-order' })
    async updateOrderStatus(@Param("id") id: string,@Body() dto: UpdateOrderDto) {
        return await this.service.updateOrderStatus(id,dto);
    }

    @Patch('/update-payment-status/:id')
    @UseGuards(AdminAuthGuard)
    @StaticRoutesProps({ routeName: 'admin-order' })
    async updateOrderPaymentStatus(@Param("id") id: string,@Body() dto: UpdateOrderDto) {
        return await this.service.updateOrderPaymentStatus(id,dto);
    }

    @Patch('/update-delivery-status/:id')
    @UseGuards(AdminAuthGuard)
    @StaticRoutesProps({ routeName: 'admin-order' })
    async updateOrderDeliveryStatus(@Param("id") id: string,@Body() dto: UpdateOrderDto) {
        return await this.service.updateOrderDeliveryStatus(id,dto);
    }


    @Delete(":orderId")
    @StaticRoutesProps({ routeName: 'admin-order' })
    @UseGuards(AdminAuthGuard)
    async remove(@Param("orderId") orderId: string) {
        return await this.service.delete(orderId);
    }

    @Get('invoice-payment')
    @UseGuards(AdminAuthGuard)
    @StaticRoutesProps({ routeName: 'invoice-payment' })
    async invoicePayment(@Query() filterDto:FilterDto) {
        return await this.service.findAllInvoice(filterDto);
    }

    @Post('refund-invoice-payment') 
    @UseGuards(AdminAuthGuard)
    refundInvoicePayment(@Body() dto: InvoiceRefundDto) {
        return this.service.refundInvoicePayment(dto);
    }

    @Patch('/update-order-tracking-number')
    @UseGuards(AdminAuthGuard)
    @StaticRoutesProps({ routeName: 'admin-order' })
    async updateOrderTrackingNumber(@Body() dto: UpdateOrderDto) {
        return await this.service.updateOrderTrackingNumber(dto);
    }



}     
