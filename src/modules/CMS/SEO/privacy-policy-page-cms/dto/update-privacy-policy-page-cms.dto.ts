import { PartialType } from '@nestjs/mapped-types';
import { BasePrivacyPolicyPageCmsDto } from './base-privacy-policy-page-cms.dto';

export class UpdatePrivacyPolicyPageCmsDto extends PartialType(BasePrivacyPolicyPageCmsDto) {}
