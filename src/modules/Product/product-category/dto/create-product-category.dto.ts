import { IsEmpty, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { StatusEnumType } from "src/utils/enum.utils";
import { ProductCategory } from "../schema/product-category.schema";

export class CreateProductCategoryDto {
    @IsOptional()
    categoryId: string;

    @IsEmpty()
    category: ProductCategory;

    @IsNotEmpty()
    name: string;

    @IsOptional()
    banner_image: string;

    @IsOptional()
    banner_title: string;

    @IsOptional()
    detail: string;

    @IsOptional()
    category_fill: string;

    @IsOptional()
    slug: string;

    @IsOptional()
    position: number;

    @IsNotEmpty()
    @IsEnum(StatusEnumType)
    status: StatusEnumType;
}
