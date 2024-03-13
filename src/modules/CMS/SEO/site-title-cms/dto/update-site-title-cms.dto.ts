import { PartialType } from '@nestjs/mapped-types';
import { BaseSiteTitleCmsDto } from './base-site-title-cms.dto';

export class UpdateSiteTitleCmsDto extends PartialType(BaseSiteTitleCmsDto) {}
