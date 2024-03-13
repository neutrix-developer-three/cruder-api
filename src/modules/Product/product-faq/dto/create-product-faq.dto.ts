import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";
import { Product } from "../../product/schema/product.schema";
import { ProductFaqType } from "../product-faq-type";

export class CreateProductFaqDto {
    
    @IsNotEmpty()
    productId: string;

    @IsEmpty()
    product: Product;

    @IsNotEmpty()
    faq: ProductFaqType[];

    @IsOptional()
    author_name: string;
}
