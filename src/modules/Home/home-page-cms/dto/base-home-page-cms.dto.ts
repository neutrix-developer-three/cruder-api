import { IsNotEmpty, IsOptional } from 'class-validator';

export class BaseHomePageCmsDto {
  @IsOptional()
  video_title: string;

  @IsOptional()
  video_subtitle: string;

  @IsOptional()
  video_section_status: string;

  @IsOptional()
  hero_section_title: string;

  @IsOptional()
  product_title: string;

  @IsOptional()
  product_subtitle: string;

  @IsOptional()
  product_subtitle_two: string;

  @IsOptional()
  product_button_text: string;

  @IsOptional()
  product_button_link: string;

  @IsOptional()
  testimonial_title: string;

  @IsOptional()
  testimonial_subtitle: string;

  @IsOptional()
  testimonial_background_image: string;

  @IsOptional()
  offer_product_title: string;

  @IsOptional()
  offer_product_subtitle: string;

  @IsOptional()
  offer_product_button_text: string;

  @IsOptional()
  offer_product_button_link: string;

  @IsOptional()
  blog_title: string;

  @IsOptional()
  blog_subtitle: string;

  @IsOptional()
  blog_button_text: string;

  @IsOptional()
  blog_button_link: string;

  @IsOptional()
  instagram_title: string;

  @IsOptional()
  instagram_subtitle: string;
}
