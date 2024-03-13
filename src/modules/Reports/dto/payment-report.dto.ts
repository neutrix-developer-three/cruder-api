import { IsOptional } from "class-validator";

export class PaymentReportDto {
    @IsOptional()
    orderId: string;

    @IsOptional()
    startDate: string;

    @IsOptional()
    endDate: string;

    @IsOptional()
    customerId: string;

    @IsOptional()
    refundStatus: string;
   
}
