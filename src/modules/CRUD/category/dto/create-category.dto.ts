import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsOptional()
    icon: string;

    @IsEmpty()
    urlSlug: string;
}
