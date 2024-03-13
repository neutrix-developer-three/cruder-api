import { IsOptional } from 'class-validator';

export class BaseSubscribePageComponentUiCmsDto {
  @IsOptional()
  button_color: string;

  @IsOptional()
  button_font_color: string;

  @IsOptional()
  subscribe_background_color: string;

}
