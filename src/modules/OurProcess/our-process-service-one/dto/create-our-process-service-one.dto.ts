import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateOurProcessServiceOneDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    image: string;

    @IsNotEmpty()
    short_detail: string;

    @IsNotEmpty()
    position: string;

}
