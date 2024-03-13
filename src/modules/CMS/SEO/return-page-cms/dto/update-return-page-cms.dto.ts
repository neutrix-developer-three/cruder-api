import { PartialType } from '@nestjs/mapped-types';
import { BaseReturnPageCmsDto } from './base-return-page-cms.dto';

export class UpdateReturnPageCmsDto extends PartialType(BaseReturnPageCmsDto) {}
