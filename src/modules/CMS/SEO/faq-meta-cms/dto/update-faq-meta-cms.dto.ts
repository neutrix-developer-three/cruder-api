import { PartialType } from '@nestjs/mapped-types';
import { BaseFaqMetaCmsDto } from './base-faq-meta-cms.dto';

export class UpdateFaqMetaCmsDto extends PartialType(BaseFaqMetaCmsDto) {}
