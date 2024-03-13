import { IsOptional } from 'class-validator';

export class BaseHomePageUiCmsDto {
  @IsOptional()
  slider_sub_heading_font_color: string;

  @IsOptional()
  slider_heading_font_color: string;

  @IsOptional()
  slider_button_color: string;

  @IsOptional()
  slider_button_font_color: string;

  @IsOptional()
  home_button_color: string;

  @IsOptional()
  home_button_font_color: string;

  @IsOptional()
  offer_button_color: string;

  @IsOptional()
  offer_button_font_color: string;

  @IsOptional()
  eco_sub_heading_font_color: string;

  @IsOptional()
  eco_heading_font_color: string;

  @IsOptional()
  gallery_item_button_color: string;

  @IsOptional()
  gallery_item_button_font_color: string;

  @IsOptional()
  news_button_color: string;

  @IsOptional()
  news_button_font_color: string;

  @IsOptional()
  video_testimonial_background_color: string;

  @IsOptional()
  intro_background_color: string;

  @IsOptional()
  about_us_background_color: string;

  @IsOptional()
  product_background_color: string;

  @IsOptional()
  gallery_background_color: string;

  @IsOptional()
  offer_product_background_color: string;
  @IsOptional()
  eco_background_color: string;

  @IsOptional()
  blog_background_color: string;

  @IsOptional()
  instagram_background_color: string;
}
