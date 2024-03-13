import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseSiteSettingsCmDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    logo: string;

    @IsOptional()
    email: string;

    @IsOptional()
    phone: string;

    @IsOptional()
    address: string;

    @IsOptional()
    short_detail: string;

    @IsOptional()
    footer_title_left: string;

    @IsOptional()
    footer_title_right: string;

    @IsOptional()
    facebook: string;

    @IsOptional()
    twitter: string;

    @IsOptional()
    instagram: string;

    @IsOptional()
    pinterest: string;

    @IsOptional()
    login_background: string;

    @IsOptional()
    youtube: string;
}
