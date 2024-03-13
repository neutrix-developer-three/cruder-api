import { PartialType } from '@nestjs/mapped-types';
import { BaseCartCmsDto } from './base-cart-cms.dto';

export class UpdateCartCmsDto extends PartialType(BaseCartCmsDto) {}
