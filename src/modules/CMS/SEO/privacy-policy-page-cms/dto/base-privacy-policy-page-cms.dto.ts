import { IsNotEmpty, IsOptional } from "class-validator";

export class BasePrivacyPolicyPageCmsDto {
    @IsNotEmpty()
    privacyPolicyPageTitle: string;

    @IsOptional()
    privacyPolicyPageMetaKeyword: string;

    @IsOptional()
    privacyPolicyPageMetaDescription: string;

}
