import { PartialType } from '@nestjs/mapped-types';
import { BaseBlogMetaCmsDto } from './base-blog-meta-cms.dto';


export class UpdateBlogMetaCmsDto extends PartialType(BaseBlogMetaCmsDto) {}
