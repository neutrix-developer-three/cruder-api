import { PartialType } from '@nestjs/mapped-types';
import { BaseBlogPageCmsDto } from './base-blog-page-cms.dto';

export class UpdateBlogPageCmsDto extends PartialType(BaseBlogPageCmsDto) {}
