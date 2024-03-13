import { PartialType } from '@nestjs/mapped-types';
import { BaseHomeEchoCmsDto } from './base-home-echo-cms.dto';

export class UpdateHomeEchoCmsDto extends PartialType(BaseHomeEchoCmsDto) {}
