import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseProductCategoryMetaCmsDto {
    @IsNotEmpty()
    categoryId: string;

    @IsOptional()
    metaTitle: string;

    @IsOptional()
    metaKeyword: string;

    @IsOptional()
    metaDescription: string;

}
