import { PartialType } from '@nestjs/mapped-types';
import { BaseHomeAboutCmsDto } from './base-home-about-cms.dto';

export class UpdateHomeAboutCmsDto extends PartialType(BaseHomeAboutCmsDto) {}
