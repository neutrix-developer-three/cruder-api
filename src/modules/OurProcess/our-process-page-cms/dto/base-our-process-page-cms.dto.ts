import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseOurProcessPageCmsDto {
    @IsNotEmpty()
    banner_title: string;

    @IsOptional()
    banner_image: string;

    @IsNotEmpty()
    service_title: string;

    @IsNotEmpty()
    service_subtitle: string;

    @IsOptional()
    image: string;

    @IsNotEmpty()
    button_text: string;

    @IsNotEmpty()
    button_link: string;

    @IsOptional()
    section_two_service_title: string;

    @IsOptional()
    section_two_service_subtitle: string;

    @IsOptional()
    section_two_image: string;

    @IsOptional()
    section_two_button_text: string;

    @IsOptional()
    section_two_button_link: string;


}

