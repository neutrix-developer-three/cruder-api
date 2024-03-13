import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseNewsletterPopupCmsDto {
    @IsOptional()
    title: string;

    @IsOptional()
    image: string;

    @IsOptional()
    email_title: string;

    @IsOptional()
    email_placeholder_text: string;

    @IsOptional()
    which_page: string[];

    @IsOptional()
    button_text: string;

    @IsOptional()
    button_color: string;
   
}
