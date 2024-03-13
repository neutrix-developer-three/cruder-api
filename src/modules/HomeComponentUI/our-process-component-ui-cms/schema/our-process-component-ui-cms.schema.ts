import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class OurProcessComponentUiCms extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  banner_font_color: string;

  @Prop({ default: null, nullable: true })
  process_button_one_color: string;

  @Prop({ default: null, nullable: true })
  process_button_one_font_color: string;

  @Prop({ default: null, nullable: true })
  process_button_two_color: string;

  @Prop({ default: null, nullable: true })
  process_button_two_font_color: string;

  @Prop({ default: null, nullable: true })
  video_sub_heading_color: string;

  @Prop({ default: null, nullable: true })
  video_heading_color: string;

  @Prop({ default: null, nullable: true })
  video_detail_color: string;

  @Prop({ default: null, nullable: true })
  process_background_color: string;

}

export const OurProcessComponentUiCmsSchema = SchemaFactory.createForClass(OurProcessComponentUiCms);
