import { IsNotEmpty, IsOptional } from "class-validator";

export class BasePromotionalPopupCmsDto {
    @IsOptional()
    logo: string;

    @IsOptional()
    image: string;

    @IsOptional()
    title: string;

    @IsOptional()
    button_text: string;

    @IsOptional()
    button_link: string;

    @IsOptional()
    button_color: string;

    @IsOptional()
    which_page: string[];

}
