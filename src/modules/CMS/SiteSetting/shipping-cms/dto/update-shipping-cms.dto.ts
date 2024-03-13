import { PartialType } from '@nestjs/mapped-types';
import { BaseShippingCmsDto } from './base-shipping-cms.dto';

export class UpdateShippingCmsDto extends PartialType(BaseShippingCmsDto) {}
