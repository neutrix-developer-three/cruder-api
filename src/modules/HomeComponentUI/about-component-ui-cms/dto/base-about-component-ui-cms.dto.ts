import { IsOptional } from 'class-validator';

export class BaseAboutComponentUiCmsDto {
  @IsOptional()
  banner_font_color: string;

  @IsOptional()
  about_button_color: string;

  @IsOptional()
  about_button_font_color: string;

  @IsOptional()
  about_us_background_color: string;

  @IsOptional()
  about_choose_us_background_color: string;

  @IsOptional()
  about_us_offer_background_color: string;

}
