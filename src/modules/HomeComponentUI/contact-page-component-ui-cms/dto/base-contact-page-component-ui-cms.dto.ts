import { IsOptional } from 'class-validator';

export class BaseContactPageComponentUiCmsDto {
  @IsOptional()
  banner_font_color: string;

  @IsOptional()
  contact_info_background_color: string;

  @IsOptional()
  contact_form_background_color: string;

}
