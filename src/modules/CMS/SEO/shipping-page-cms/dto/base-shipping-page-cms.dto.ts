import { IsNotEmpty, IsOptional } from "class-validator";

export class BaseShippingPageCmsDto {
    @IsNotEmpty()
    shippingPageTitle: string;

    @IsOptional()
    shippingPageMetaKeyword: string;

    @IsOptional()
    shippingPageMetaDescription: string;

}
