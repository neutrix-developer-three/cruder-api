import { PartialType } from "@nestjs/mapped-types";
import { CreateProductCategoryFaqDto } from "./create-product-category-faq.dto";

export class UpdateProductCategoryFaqDto extends PartialType(CreateProductCategoryFaqDto) { }