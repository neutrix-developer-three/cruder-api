import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseAboutPageBannerCMSDto {
    @IsNotEmpty()
    heading: string;

    @IsOptional()
    backgroundImage: string;
}