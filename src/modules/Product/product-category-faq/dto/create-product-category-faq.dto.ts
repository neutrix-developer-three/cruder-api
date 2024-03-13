import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";
import { ProductCategoryFaqType } from "../product-category-faq-type";
import { ProductCategory } from "../../product-category/schema/product-category.schema";

export class CreateProductCategoryFaqDto {
    
    @IsNotEmpty()
    categoryId: string;

    @IsEmpty()
    category: ProductCategory;

    @IsNotEmpty()
    faq: ProductCategoryFaqType[];

    @IsOptional()
    author_name: string;
}
