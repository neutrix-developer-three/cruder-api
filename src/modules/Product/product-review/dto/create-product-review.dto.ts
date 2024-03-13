import { IsEmpty, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { ProductReviewStatusEnumType, StatusEnumType } from "src/utils/enum.utils";
import { Product } from "../../product/schema/product.schema";

export class CreateProductReviewDto {
    @IsNotEmpty()
    productId: string;

    @IsEmpty()
    product: Product;

    @IsOptional()
    userId: string;

    @IsNotEmpty()
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
