import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseTermsConditionPageCmsDto {
    @IsNotEmpty()
    termsConditionPageTitle: string;

    @IsOptional()
    termsConditionPageMetaKeyword: string;

    @IsOptional()
    termsConditionPageMetaDescription: string;

}
