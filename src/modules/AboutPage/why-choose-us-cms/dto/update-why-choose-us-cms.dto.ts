import { PartialType } from '@nestjs/mapped-types';
import { BaseWhyChooseUsCmsDto } from './base-why-choose-us-cms.dto';

export class UpdateWhyChooseUsCmsDto extends PartialType(BaseWhyChooseUsCmsDto) {}
