import { PartialType } from '@nestjs/mapped-types';
import { BaseFaqPageCmsDto } from './base-faq-page-cms.dto';

export class UpdateFaqPageCmsDto extends PartialType(BaseFaqPageCmsDto) {}
