import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseProductMetaCmsDto {
    @IsNotEmpty()
    productId: string;

    @IsOptional()
    metaTitle: string;

    @IsOptional()
    metaKeyword: string;

    @IsOptional()
    metaDescription: string;

}
