import { IsOptional } from 'class-validator';

export class BaseProductDetailsComponentUiCmsDto {
  @IsOptional()
  add_to_cart_button_bg_color: string;

  @IsOptional()
  add_to_cart_button_font_color: string;

  @IsOptional()
  description_active_bg_color: string;

  @IsOptional()
  description_active_font_color: string;

  @IsOptional()
  description_default_bg_color: string;

  @IsOptional()
  description_default_font_color: string;

  @IsOptional()
  product_detail_background_color: string;

  @IsOptional()
  related_product_background_color: string;

}
