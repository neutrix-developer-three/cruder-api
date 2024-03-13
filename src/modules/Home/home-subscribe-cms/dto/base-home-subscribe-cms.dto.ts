import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseHomeSubscribeCmsDto {
    @IsOptional()
    title: string;

    @IsOptional()
    image: string;

    @IsOptional()
    placeholder_text: string;

    @IsOptional()
    button_text: string;

}
