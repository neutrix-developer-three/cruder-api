import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { Constants } from "src/utils/constants";
import { OrderService } from "./order.service";
import { PlaceOrderDto } from "./dto/place-order.dto";
import { OptionalAuthGuard } from "src/core/guards/optional-auth.guard";

@Controller({ path: "order", version: Constants.API_VERSION_1 })

export class OrderController {
    constructor(private readonly service: OrderService) {
    }
    @Post() 
    @UseGuards(OptionalAuthGuard)
    create(@Body() dto: PlaceOrderDto,@Req() request) {
        const user = request?.user;
        return this.service.create(dto,user);
    }
    @Get('order-confirmation/:orderId')
    findOrderInfo(@Param('orderId') orderId: string) {
        return this.service.findOrderInfo(orderId);
    }


}
