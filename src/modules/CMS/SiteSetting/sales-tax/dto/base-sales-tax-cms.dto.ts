import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseSalesTaxCmsDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    dis_amount: string;
}
