import { IsEmpty, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { ProductReviewStatusEnumType, StatusEnumType } from "src/utils/enum.utils";
import { Product } from "../../product/schema/product.schema";

export class CreateUserProductReviewDto {
    @IsNotEmpty()
    productId: string;

    @IsEmpty()
    product: Product;

    @IsOptional()
    userId: string;

    @IsEmpty()
    reviewerName: string;

    @IsOptional()
    reviewerImage: string;

    @IsOptional()
    reviewerComment: string;

    @IsOptional()
    reviewRating: number;

    @IsOptional()
    reviewDate: string;


    @IsOptional()
    @IsEnum(ProductReviewStatusEnumType)
    reviewStatus: ProductReviewStatusEnumType;
}
