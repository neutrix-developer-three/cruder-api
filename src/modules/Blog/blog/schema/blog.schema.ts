import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class Blog extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  title: string;

  @Prop({ default: null, nullable: true })
  image: string;

  @Prop({ default: null, nullable: true })
  short_detail: string;

  @Prop({ default: null, nullable: true })
  long_detail: string;

  @Prop({ default: null, nullable: true })
  author_name: string;

  @Prop({ default: null, nullable: true })
  slug: string;

  @Prop({ default: 'publish', nullable: true })
  isPublish: string;

  @Prop({ default: null, nullable: true })
  image_alt_text: string;

}

export const BlogSchema = SchemaFactory.createForClass(Blog);