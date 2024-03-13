import { PartialType } from '@nestjs/mapped-types';
import { BaseProductDetailsComponentUiCmsDto } from './base-product-details-component-ui-cms.dto';

export class UpdateProductDetailsComponentUiCmsDto extends PartialType(BaseProductDetailsComponentUiCmsDto) {}
