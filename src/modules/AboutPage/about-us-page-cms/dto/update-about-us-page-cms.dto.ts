import { PartialType } from '@nestjs/mapped-types';
import { BaseAboutUsPageCmsDto } from './base-about-us-page-cms.dto';

export class UpdateAboutUsPageCmsDto extends PartialType(BaseAboutUsPageCmsDto) {}
