import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseBlogMetaCmsDto {
    @IsNotEmpty()
    blogId: string;

    @IsOptional()
    metaTitle: string;

    @IsOptional()
    metaKeyword: string;

    @IsOptional()
    metaDescription: string;

}
