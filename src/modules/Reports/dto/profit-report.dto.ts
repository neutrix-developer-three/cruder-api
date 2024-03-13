import { IsOptional } from "class-validator";

export class ProfitReportDto {
    @IsOptional()
    orderId: string;

    @IsOptional()
    startDate: string;

    @IsOptional()
    endDate: string;

    @IsOptional()
    customerId: string;
   
}
