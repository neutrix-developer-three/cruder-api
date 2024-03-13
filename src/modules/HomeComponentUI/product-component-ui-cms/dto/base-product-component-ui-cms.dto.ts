import { IsOptional } from 'class-validator';

export class BaseProductComponentUiCmsDto {
  @IsOptional()
  heading_font_color: string;

  @IsOptional()
  product_background_color: string;

  @IsOptional()
  product_detail_background_color: string;

}
