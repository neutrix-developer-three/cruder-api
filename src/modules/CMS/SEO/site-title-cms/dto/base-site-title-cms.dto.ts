import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseSiteTitleCmsDto {
    @IsNotEmpty()
    homePageTitle: string;

    @IsOptional()
    homePageMetaKeyword: string;

    @IsOptional()
    homePageMetaDescription: string;

    @IsOptional()
    shopPageTitle: string;

    @IsOptional()
    shopPageMetaKeyword: string;

    @IsOptional()
    shopPageMetaDescription: string;

    @IsOptional()
    aboutUsPageTitle: string;

    @IsOptional()
    aboutUsPageMetaKeyword: string;

    @IsOptional()
    aboutUsPageMetaDescription: string;

    @IsOptional()
    ourProcessPageTitle: string;

    @IsOptional()
    ourProcessPageMetaKeyword: string;

    @IsOptional()
    ourProcessPageMetaDescription: string;

    @IsOptional()
    contactUsPageTitle: string;

    @IsOptional()
    contactUsPageMetaKeyword: string;

    @IsOptional()
    contactUsPageMetaDescription: string;

    @IsOptional()
    blogPageTitle: string;

    @IsOptional()
    blogPageMetaKeyword: string;

    @IsOptional()
    blogPageMetaDescription: string;

}
