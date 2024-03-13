import { PartialType } from '@nestjs/mapped-types';
import { BaseOurProcessComponentUiCmsDto } from './base-our-process-component-ui-cms.dto';

export class UpdateOurProcessComponentUiCmsDto extends PartialType(BaseOurProcessComponentUiCmsDto) {}
