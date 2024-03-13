import { PartialType } from '@nestjs/mapped-types';
import { BaseContactPageComponentUiCmsDto } from './base-contact-page-component-ui-cms.dto';

export class UpdateContactPageComponentUiCmsDto extends PartialType(BaseContactPageComponentUiCmsDto) {}
