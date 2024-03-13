import { IsNotEmpty, IsOptional } from "class-validator";

export class BasePrivacyPolicyCmsDto {
    @IsNotEmpty()
    banner_title: string;

    @IsOptional()
    banner_image: string;

    @IsOptional()
    title: string;

    @IsOptional()
    details: string;
}

