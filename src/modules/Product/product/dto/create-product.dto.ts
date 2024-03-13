import { IsEmpty, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { DiscountEnumType } from "src/utils/enum.utils";
import { ProductCategory } from "../../product-category/schema/product-category.schema";
import { ProductTag } from "../../product-tag/schema/product-tag.schema";
import { Product } from "../schema/product.schema";
import { ProductImages } from "../product-images.interface";

export class CreateProductDto {
    @IsNotEmpty()
    categoryIds: string[];

    @IsEmpty()
    categories: ProductCategory[];

    @IsNotEmpty()
    name: string;

    @IsOptional()
    image: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    cost: number;

    @IsOptional()
    reorder: number;

    @IsNotEmpty()
    @IsEnum(DiscountEnumType)
    discount_type: DiscountEnumType;

    @IsOptional()
    discount_amount: number;

    @IsOptional()
    discount_total_amount: number;

    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    short_detail: string;

    @IsNotEmpty()
    long_detail: string;

    @IsNotEmpty()
    additional_info: string;

    @IsOptional()
    recommendation_product_id: string;

    @IsEmpty()
    recommendation_product: Product;

    @IsOptional()
    slug: string;

    @IsNotEmpty()
    product_tag_id: string;

    @IsEmpty()
    product_tag: ProductTag;

    @IsOptional()
    position: number;

    @IsNotEmpty()
    image_alt_text: string;

    @IsOptional()
    product_images: string[];

    @IsOptional()
    images_alt_text: string[];

    @IsOptional()
    product_images_alt_text: ProductImages[];

    @IsNotEmpty()
    category_fill: string;

    @IsEmpty()
    rating: number;


    
}
