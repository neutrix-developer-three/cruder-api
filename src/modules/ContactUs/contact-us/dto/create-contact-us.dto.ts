import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateContactUsDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    company: string;

    @IsNotEmpty()
    subject: string;

    @IsNotEmpty()
    message: string;

}
