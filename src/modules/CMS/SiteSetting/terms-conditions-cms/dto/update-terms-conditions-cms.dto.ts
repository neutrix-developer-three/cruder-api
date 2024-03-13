import { PartialType } from '@nestjs/mapped-types';
import { BaseTermsConditionsCmsDto } from './base-terms-conditions-cms.dto';

export class UpdateTermsConditionsCmsDto extends PartialType(BaseTermsConditionsCmsDto) {}
