import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateHomeProgressWrapsDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    content: string;

}
