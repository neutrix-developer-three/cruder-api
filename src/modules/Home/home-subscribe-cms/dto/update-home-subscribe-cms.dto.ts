import { PartialType } from '@nestjs/mapped-types';
import { BaseHomeSubscribeCmsDto } from './base-home-subscribe-cms.dto';

export class UpdateHomeSubscribeCmsDto extends PartialType(BaseHomeSubscribeCmsDto) {}
