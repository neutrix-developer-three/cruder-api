import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class HomePageCms extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  video_title: string;

  @Prop({ default: null, nullable: true })
  video_subtitle: string;

  @Prop({ default: null, nullable: true })
  video_section_status: string;

  @Prop({ default: null, nullable: true })
  hero_section_title: string;

  @Prop({ default: null, nullable: true })
  product_title: string;

  @Prop({ default: null, nullable: true })
  product_subtitle: string;

  @Prop({ default: null, nullable: true })
  product_subtitle_two: string;

  @Prop({ default: null, nullable: true })
  product_button_text: string;

  @Prop({ default: null, nullable: true })
  product_button_link: string;

  @Prop({ default: null, nullable: true })
  testimonial_title: string;

  @Prop({ default: null, nullable: true })
  testimonial_subtitle: string;

  @Prop({ default: null, nullable: true })
  testimonial_background_image: string;

  @Prop({ default: null, nullable: true })
  offer_product_title: string;

  @Prop({ default: null, nullable: true })
  offer_product_subtitle: string;

  @Prop({ default: null, nullable: true })
  offer_product_button_text: string;

  @Prop({ default: null, nullable: true })
  offer_product_button_link: string;

  @Prop({ default: null, nullable: true })
  blog_title: string;

  @Prop({ default: null, nullable: true })
  blog_subtitle: string;

  @Prop({ default: null, nullable: true })
  blog_button_text: string;

  @Prop({ default: null, nullable: true })
  blog_button_link: string;

  @Prop({ default: null, nullable: true })
  instagram_title: string;

  @Prop({ default: null, nullable: true })
  instagram_subtitle: string;
}

export const HomePageCmsSchema = SchemaFactory.createForClass(HomePageCms);
