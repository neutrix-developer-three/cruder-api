import { PartialType } from '@nestjs/mapped-types';
import { BaseContactUsCmsDto } from './base-contact-us-cms.dto';

export class UpdateContactUsCmsDto extends PartialType(BaseContactUsCmsDto) {}
