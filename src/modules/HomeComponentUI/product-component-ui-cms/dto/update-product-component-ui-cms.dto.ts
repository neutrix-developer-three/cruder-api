import { PartialType } from '@nestjs/mapped-types';
import { BaseProductComponentUiCmsDto } from './base-product-component-ui-cms.dto';

export class UpdateProductComponentUiCmsDto extends PartialType(BaseProductComponentUiCmsDto) {}
