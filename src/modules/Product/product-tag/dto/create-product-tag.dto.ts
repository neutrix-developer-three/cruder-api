import { IsNotEmpty } from "class-validator";

export class CreateProductTagDto {
    @IsNotEmpty()
    name: string;
}
