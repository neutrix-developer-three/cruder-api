import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAboutUsOfferDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    image: string;

    @IsOptional()
    link: string;
}
