import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseContactUsCmsDto {
    @IsNotEmpty()
    banner_title: string;

    @IsOptional()
    banner_image: string;

    @IsOptional()
    contact_info_title: string;

    @IsOptional()
    contact_info_short_detail: string;

    @IsOptional()
    image: string;

    @IsOptional()
    location_title: string;

    @IsOptional()
    location_subtitle: string;

    @IsOptional()
    location_short_detail: string;

    @IsOptional()
    location_background_image: string;

    @IsOptional()
    location_name_one: string;

    @IsOptional()
    location_address_one: string;

    @IsOptional()
    location_name_two: string;

    @IsOptional()
    location_address_two: string;

    @IsOptional()
    button_text: string;

    @IsOptional()
    email_icon: string;

    @IsOptional()
    call_icon: string;

    @IsOptional()
    social_icon_1: string;

    @IsOptional()
    social_icon_1_bg: string;

    @IsOptional()
    social_icon_2: string;

    @IsOptional()
    social_icon_2_bg: string;

    @IsOptional()
    social_icon_3: string;

    @IsOptional()
    social_icon_3_bg: string;

    @IsOptional()
    social_icon_4: string;

    @IsOptional()
    social_icon_4_bg: string;

    @IsOptional()
    social_icon_1_link: string;

    @IsOptional()
    social_icon_2_link: string;

    @IsOptional()
    social_icon_3_link: string;

    @IsOptional()
    social_icon_4_link: string;

    @IsOptional()
    form_text_color: string;

    
}

