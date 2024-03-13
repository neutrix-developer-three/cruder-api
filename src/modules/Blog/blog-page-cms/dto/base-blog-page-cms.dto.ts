import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseBlogPageCmsDto {
    @IsNotEmpty()
    banner_title: string;

    @IsOptional()
    banner_image: string;
}

