import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class BlogPageComponentUiCms extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  banner_font_color: string;

  @Prop({ default: null, nullable: true })
  blog_background_color: string;

}

export const BlogPageComponentUiCmsSchema = SchemaFactory.createForClass(BlogPageComponentUiCms);
