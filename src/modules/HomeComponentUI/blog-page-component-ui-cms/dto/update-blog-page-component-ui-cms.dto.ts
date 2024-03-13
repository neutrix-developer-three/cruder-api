import { PartialType } from '@nestjs/mapped-types';
import { BaseBlogPageComponentUiCmsDto } from './base-blog-page-component-ui-cms.dto';

export class UpdateBlogPageComponentUiCmsDto extends PartialType(BaseBlogPageComponentUiCmsDto) {}
