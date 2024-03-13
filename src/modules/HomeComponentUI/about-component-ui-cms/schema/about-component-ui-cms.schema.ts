import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class AboutComponentUiCms extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  banner_font_color: string;

  @Prop({ default: null, nullable: true })
  about_button_color: string;

  @Prop({ default: null, nullable: true })
  about_button_font_color: string;

  @Prop({ default: null, nullable: true })
  about_us_background_color: string;

  @Prop({ default: null, nullable: true })
  about_choose_us_background_color: string;

  @Prop({ default: null, nullable: true })
  about_us_offer_background_color: string;

}

export const AboutComponentUiCmsSchema = SchemaFactory.createForClass(AboutComponentUiCms);
