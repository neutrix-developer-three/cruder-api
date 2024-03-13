import { PartialType } from '@nestjs/mapped-types';
import { BaseShippingPageCmsDto } from './base-shipping-page-cms.dto';


export class UpdateShippingPageCmsDto extends PartialType(BaseShippingPageCmsDto) {}
