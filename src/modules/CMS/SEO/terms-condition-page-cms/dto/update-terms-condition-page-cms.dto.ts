import { PartialType } from '@nestjs/mapped-types';
import { BaseTermsConditionPageCmsDto } from './base-terms-condition-page-cms.dto';

export class UpdateTermsConditionPageCmsDto extends PartialType(BaseTermsConditionPageCmsDto) {}
