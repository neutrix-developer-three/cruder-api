import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { HomeIntroStatusEnumType } from "src/utils/enum.utils";

export class CreateHomeIntroDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    image: string;

    @IsOptional()
    subtitle: string;

    @IsOptional()
    background_image: string;

    @IsOptional()
    link: string;

    @IsOptional()
    @IsEnum(HomeIntroStatusEnumType)
    status: HomeIntroStatusEnumType;
}
