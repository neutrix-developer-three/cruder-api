import { PartialType } from '@nestjs/mapped-types';
import { BaseSalesTaxCmsDto } from './base-sales-tax-cms.dto';

export class UpdateSalesTaxCmsDto extends PartialType(BaseSalesTaxCmsDto) {}
