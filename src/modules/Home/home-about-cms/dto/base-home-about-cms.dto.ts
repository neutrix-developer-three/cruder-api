import { IsOptional } from "class-validator";

export class BaseHomeAboutCmsDto {
    @IsOptional()
    title: string;

    @IsOptional()
    image: string;

    @IsOptional()
    subtitle: string;

    @IsOptional()
    short_detail: string;

    @IsOptional()
    about_info_icon_one: string;

    @IsOptional()
    about_info_title_one: string;

    @IsOptional()
    about_info_detail_one: string;

    @IsOptional()
    about_info_icon_two: string;

    @IsOptional()
    about_info_title_two: string;

    @IsOptional()
    about_info_detail_two: string;

    @IsOptional()
    button_text: string;

    @IsOptional()
    button_link: string;

}
