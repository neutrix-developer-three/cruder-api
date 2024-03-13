import { PartialType } from '@nestjs/mapped-types';
import { BaseOurProcessPageCmsDto } from './base-our-process-page-cms.dto';

export class UpdateOurProcessPageCmsDto extends PartialType(BaseOurProcessPageCmsDto) {}
