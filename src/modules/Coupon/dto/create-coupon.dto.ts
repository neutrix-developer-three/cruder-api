import { IsEmpty, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { ProductCategory } from "src/modules/Product/product-category/schema/product-category.schema";
import { CouponCodeEnumType, StatusEnumType } from "src/utils/enum.utils";

export class CreateCouponDto {
    @IsNotEmpty()
    couponName: string;

    @IsNotEmpty()
    couponCode : string;

    @IsOptional()
    quantity_discount_quota: string;

    @IsOptional()
    category_id: string;

    @IsEmpty()
    category: ProductCategory;

    @IsNotEmpty()
    expireDate: string;

    @IsNotEmpty()
    @IsEnum(CouponCodeEnumType)
    couponTypes: CouponCodeEnumType;
    
    @IsNotEmpty()
    discount: number;

    @IsOptional()
    exceedOrderAmount: number;

    @IsOptional()
    cuponUsedTotal: number;

    @IsOptional()
    @IsEnum(StatusEnumType)
    status: StatusEnumType;
}
