import { PartialType } from '@nestjs/mapped-types';
import { BaseProductCategoryMetaCmsDto } from './base-product-category-meta-cms.dto';

export class UpdateProductCategoryMetaCmsDto extends PartialType(BaseProductCategoryMetaCmsDto) {}
