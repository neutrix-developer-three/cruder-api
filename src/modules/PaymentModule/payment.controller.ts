import { Controller } from '@nestjs/common';
import { Constants } from "src/utils/constants";
import { PaymentService } from './payment.service';


@Controller({
    path: "payment",
    version: Constants.API_VERSION_1
})
export class PaymentController {
    constructor(private readonly service: PaymentService) { }


}     
