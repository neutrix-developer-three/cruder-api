import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseShippingCmsDto {
    @IsNotEmpty()
    banner_title: string;

    @IsOptional()
    banner_image: string;

    @IsOptional()
    title: string;

    @IsOptional()
    details: string;

    @IsOptional()
    destination_zip_code: string;
}

