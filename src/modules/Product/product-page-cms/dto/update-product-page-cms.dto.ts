import { PartialType } from '@nestjs/mapped-types';
import { BaseProductPageCmsDto } from './base-product-page-cms.dto';

export class UpdateProductPageCmsDto extends PartialType(BaseProductPageCmsDto) {}
