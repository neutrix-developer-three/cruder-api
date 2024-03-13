import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateHomeGalleryDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    image: string;

    @IsOptional()
    link: string;
}
