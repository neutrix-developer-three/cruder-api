import { PartialType } from '@nestjs/mapped-types';
import { BaseOurProcessVideoCmsDto } from './base-our-process-video-cms.dto';

export class UpdateOurProcessVideoCmsDto extends PartialType(BaseOurProcessVideoCmsDto) {}
