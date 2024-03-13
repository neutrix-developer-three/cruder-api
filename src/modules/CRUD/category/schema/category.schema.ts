import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class Category extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  title: string;

  @Prop({ default: null, nullable: true })
  description: string;

  @Prop({ default: null, nullable: true })
  icon: string;

  @Prop({ default: null })
  urlSlug: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);