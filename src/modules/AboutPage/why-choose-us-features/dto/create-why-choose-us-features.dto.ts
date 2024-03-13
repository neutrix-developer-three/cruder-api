import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateWhyChooseUsFeaturesDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    image: string;

    @IsOptional()
    short_detail: string;
}
