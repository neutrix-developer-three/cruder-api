import { PartialType } from '@nestjs/mapped-types';
import { BaseHomePageUiCmsDto } from './base-home-page-ui-cms.dto';

export class UpdateHomePageUiCmsDto extends PartialType(BaseHomePageUiCmsDto) {}
