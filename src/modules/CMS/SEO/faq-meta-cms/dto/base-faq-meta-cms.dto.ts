import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseFaqMetaCmsDto {
    @IsNotEmpty()
    metaTitle: string;

    @IsOptional()
    metaKeyword: string;

    @IsOptional()
    metaDescription: string;

}
