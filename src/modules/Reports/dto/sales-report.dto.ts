import { IsOptional } from "class-validator";

export class SalesReportDto {
    @IsOptional()
    orderId: string;

    @IsOptional()
    startDate: string;

    @IsOptional()
    endDate: string;

    @IsOptional()
    customerId: string;

    @IsOptional()
    paymentStatus: string;
   
}
