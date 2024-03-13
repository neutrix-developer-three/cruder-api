import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseFaqPageCmsDto {
    @IsNotEmpty()
    banner_title: string;

    @IsOptional()
    banner_image: string;

    @IsNotEmpty()
    page_title: string;

}

