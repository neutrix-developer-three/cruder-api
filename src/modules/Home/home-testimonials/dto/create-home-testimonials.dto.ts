import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateHomeTestimonialsDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    designation: string;

    @IsOptional()
    image: string;

    @IsOptional()
    short_detail: string;

    @IsOptional()
    rating: number;
}
