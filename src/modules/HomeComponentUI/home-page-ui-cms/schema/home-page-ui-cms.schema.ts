import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class HomePageUiCms extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  slider_sub_heading_font_color: string;

  @Prop({ default: null, nullable: true })
  slider_heading_font_color: string;

  @Prop({ default: null, nullable: true })
  slider_button_color: string;

  @Prop({ default: null, nullable: true })
  slider_button_font_color: string;

  @Prop({ default: null, nullable: true })
  home_button_color: string;

  @Prop({ default: null, nullable: true })
  home_button_font_color: string;

  @Prop({ default: null, nullable: true })
  offer_button_color: string;

  @Prop({ default: null, nullable: true })
  offer_button_font_color: string;

  @Prop({ default: null, nullable: true })
  eco_sub_heading_font_color: string;

  @Prop({ default: null, nullable: true })
  eco_heading_font_color: string;

  @Prop({ default: null, nullable: true })
  gallery_item_button_color: string;

  @Prop({ default: null, nullable: true })
  gallery_item_button_font_color: string;

  @Prop({ default: null, nullable: true })
  news_button_color: string;

  @Prop({ default: null, nullable: true })
  news_button_font_color: string;

  @Prop({ default: null, nullable: true })
  video_testimonial_background_color: string;

  @Prop({ default: null, nullable: true })
  intro_background_color: string;

  @Prop({ default: null, nullable: true })
  about_us_background_color: string;

  @Prop({ default: null, nullable: true })
  product_background_color: string;

  @Prop({ default: null, nullable: true })
  gallery_background_color: string;

  @Prop({ default: null, nullable: true })
  offer_product_background_color: string;

  @Prop({ default: null, nullable: true })
  eco_background_color: string;

  @Prop({ default: null, nullable: true })
  blog_background_color: string;

  @Prop({ default: null, nullable: true })
  instagram_background_color: string;
}

export const HomePageUiCmsSchema = SchemaFactory.createForClass(HomePageUiCms);
