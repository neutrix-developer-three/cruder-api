import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseAboutUsPageCmsDto {
    @IsNotEmpty()
    banner_title: string;

    @IsOptional()
    banner_image: string;

    @IsOptional()
    team_title: string;

    @IsOptional()
    team_subtitle: string;

    @IsOptional()
    team_short_detail: string;

    @IsOptional()
    offer_title: string;

    @IsOptional()
    offer_subtitle: string;

}

