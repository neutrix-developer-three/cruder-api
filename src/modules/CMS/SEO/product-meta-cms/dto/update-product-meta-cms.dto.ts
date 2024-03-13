import { PartialType } from '@nestjs/mapped-types';
import { BaseProductMetaCmsDto } from './base-product-meta-cms.dto';


export class UpdateProductMetaCmsDto extends PartialType(BaseProductMetaCmsDto) {}
