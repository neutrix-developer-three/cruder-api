import { PartialType } from '@nestjs/mapped-types';
import { BaseReturnsCmsDto } from './base-returns-cms.dto';

export class UpdateReturnsCmsDto extends PartialType(BaseReturnsCmsDto) {}
