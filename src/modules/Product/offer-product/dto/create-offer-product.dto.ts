import { IsEmpty, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { StatusEnumType } from "src/utils/enum.utils";
import { Product } from "../../product/schema/product.schema";
import { ProductCategory } from "../../product-category/schema/product-category.schema";

export class CreateOfferProductDto {
    @IsNotEmpty()
    categoryId: string;

    @IsEmpty()
    category: ProductCategory;

    @IsNotEmpty()
    productId: string;

    @IsEmpty()
    product: Product;

    @IsOptional()
    image: string;

    @IsNotEmpty()
    @IsEnum(StatusEnumType)
    status: StatusEnumType;
}
