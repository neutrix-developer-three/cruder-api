import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateFaqDto {
    @IsNotEmpty()
    question: string;

    @IsNotEmpty()
    answer: string;

    @IsOptional()
    author_name: string;

}
