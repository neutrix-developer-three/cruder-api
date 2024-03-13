import { IsNotEmpty, IsOptional } from "class-validator";

export class CreatePagesDto {
    @IsNotEmpty()
    displayName: string;

    @IsNotEmpty()
    routeName: string;
}
