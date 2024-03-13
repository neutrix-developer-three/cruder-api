import { IsOptional } from 'class-validator';

export class BaseBlogPageComponentUiCmsDto {
  @IsOptional()
  banner_font_color: string;

  @IsOptional()
  blog_background_color: string;


}
