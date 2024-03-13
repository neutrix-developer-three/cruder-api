import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateOurProcessServiceTwoDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    image: string;

    @IsNotEmpty()
    short_detail: string;

    @IsNotEmpty()
    position: string;

}
