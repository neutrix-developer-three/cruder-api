import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseReturnPageCmsDto {
    @IsNotEmpty()
    returnPageTitle: string;

    @IsOptional()
    returnPageMetaKeyword: string;

    @IsOptional()
    returnPageMetaDescription: string;

}
