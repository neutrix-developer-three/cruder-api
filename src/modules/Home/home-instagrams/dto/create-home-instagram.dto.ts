import { IsEnum, IsOptional } from "class-validator";
import { HomeInstagramMediaEnumType } from "src/utils/enum.utils";

export class CreateHomeInstagramDto {

    @IsOptional()
    @IsEnum(HomeInstagramMediaEnumType)
    media_type: HomeInstagramMediaEnumType;

    @IsOptional()
    permalink: string;

    @IsOptional()
    media_url: string;

    @IsOptional()
    username: string;

    @IsOptional()
    caption: string;

    @IsOptional()
    timestamp: Date;

   
}
