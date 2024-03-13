import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseAboutUsCmsDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    subtitle: string;

    @IsOptional()
    image: string;

    @IsOptional()
    short_detail: string;

    @IsOptional()
    about_item_icon_one: string;

    @IsOptional()
    about_item_title_one: string;

    @IsOptional()
    about_item_icon_two: string;

    @IsOptional()
    about_item_title_two: string;

    @IsOptional()
    blog_button_text: string;

    @IsOptional()
    blog_button_link: string;
}

