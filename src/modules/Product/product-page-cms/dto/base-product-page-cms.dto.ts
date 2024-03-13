import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseProductPageCmsDto {
    @IsNotEmpty()
    banner_title: string;

    @IsOptional()
    banner_image: string;

    @IsOptional()
    detail: string;
}

