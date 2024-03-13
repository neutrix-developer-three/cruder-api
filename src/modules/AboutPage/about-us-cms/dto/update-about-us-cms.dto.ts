import { PartialType } from '@nestjs/mapped-types';
import { BaseAboutUsCmsDto } from './base-about-us-cms.dto';

export class UpdateAboutUsCmsDto extends PartialType(BaseAboutUsCmsDto) {}
