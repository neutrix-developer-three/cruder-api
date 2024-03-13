import { IsOptional } from 'class-validator';

export class BaseOurProcessComponentUiCmsDto {
  @IsOptional()
  banner_font_color: string;

  @IsOptional()
  process_button_one_color: string;

  @IsOptional()
  process_button_one_font_color: string;

  @IsOptional()
  process_button_two_color: string;

  @IsOptional()
  process_button_two_font_color: string;

  @IsOptional()
  video_sub_heading_color: string;

  @IsOptional()
  video_heading_color: string;

  @IsOptional()
  video_detail_color: string;

  @IsOptional()
  process_background_color: string;

}
