import { PartialType } from '@nestjs/mapped-types';
import { BaseHeroSectionCmsDto } from './base-hero-section-cms.dto';

export class UpdateHeroSectionCmsDto extends PartialType(BaseHeroSectionCmsDto) {}
