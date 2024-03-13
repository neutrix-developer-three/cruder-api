import { PartialType } from '@nestjs/mapped-types';
import { BasePrivacyPolicyCmsDto } from './base-privacy-policy-cms.dto';

export class UpdatePrivacyPolicyCmsDto extends PartialType(BasePrivacyPolicyCmsDto) {}
