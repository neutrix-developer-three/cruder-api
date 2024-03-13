import { PartialType } from '@nestjs/mapped-types';
import { BaseAboutComponentUiCmsDto } from './base-about-component-ui-cms.dto';

export class UpdateAboutComponentUiCmsDto extends PartialType(BaseAboutComponentUiCmsDto) {}
