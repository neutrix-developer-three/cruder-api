import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseTermsConditionsCmsDto {
    @IsNotEmpty()
    banner_title: string;

    @IsOptional()
    banner_image: string;

    @IsOptional()
    title: string;

    @IsOptional()
    details: string;
}

