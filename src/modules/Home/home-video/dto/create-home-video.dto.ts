import {IsOptional } from "class-validator";

export class CreateHomeVideoDto {
    @IsOptional()
    video: string;

    @IsOptional()
    image: string;

}
