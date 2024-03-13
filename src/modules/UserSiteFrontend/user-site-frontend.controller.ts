import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Constants } from "src/utils/constants";
import { UserSiteFrontendService } from './user-site-frontend.service';
import { AuthGuard } from 'src/core/guards/auth.guard';

@Controller({
    path: "user-site",
    version: Constants.API_VERSION_1
})
export class UserSiteFrontendController {
    constructor(private readonly service: UserSiteFrontendService) { }

    @Get('/dashboard')
    @UseGuards(AuthGuard)
    async getUserDashboardData(@Req() request) {
        const user = request?.user;
        return await this.service.getUserDashboardData(user);
    }

    @Get('/all-order')
    @UseGuards(AuthGuard)
    async getUserAllOrderData(@Req() request) {
        const user = request?.user;
        return await this.service.getUserAllOrderData(user);
    }

    @Get('/complete-order')
    @UseGuards(AuthGuard)
    async getUserAllCompleteOrderData(@Req() request) {
        const user = request?.user;
        return await this.service.getUserAllCompleteOrderData(user);
    }

    @Get('/pending-order')
    @UseGuards(AuthGuard)
    async getUserAllPendingOrderData(@Req() request) {
        const user = request?.user;
        return await this.service.getUserAllPendingOrderData(user);
    }

    @Get('/reject-order')
    @UseGuards(AuthGuard)
    async getUserAllRejectOrderData(@Req() request) {
        const user = request?.user;
        return await this.service.getUserAllRejectOrderData(user);
    }
    
    @Post('/order-tracking')
    @UseGuards(AuthGuard)
    async orderTrackingData(@Body('orderNumber') orderNumber:string,@Req() request) {
        const user = request?.user;
        return await this.service.orderTrackingData(orderNumber, user);
    }

    @Get('/user-profile')
    @UseGuards(AuthGuard)
    async getUserProfileData(@Req() request) {
        const user = request?.user;
        return await this.service.getUserProfileData(user);
    }

    @Get('/order/details/:orderId')
    @UseGuards(AuthGuard)
    async findUserOrderDetails(@Param("orderId") orderId: string, @Req() request) {
        const user = request?.user;
        return await this.service.findUserOrderDetails(orderId, user);
    }






}     
