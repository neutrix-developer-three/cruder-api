import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseWhyChooseUsCmsDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    subtitle: string;

    @IsOptional()
    image: string;

    @IsOptional()
    short_detail: string;

    @IsOptional()
    choose_us_title_one: string;

    @IsOptional()
    choose_us_details_one: string;

    @IsOptional()
    choose_us_title_two: string;

    @IsOptional()
    choose_us_details_two: string;
}

