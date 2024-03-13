import { PartialType } from '@nestjs/mapped-types';
import { BaseCartPageComponentUiCmsDto } from './base-cart-page-component-ui-cms.dto';

export class UpdateCartPageComponentUiCmsDto extends PartialType(BaseCartPageComponentUiCmsDto) {}
