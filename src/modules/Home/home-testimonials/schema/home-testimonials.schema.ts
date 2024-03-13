import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class HomeTestimonials extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  name: string;

  @Prop({ default: null, nullable: true })
  image: string;

  @Prop({ default: null, nullable: true })
  designation: string;

  @Prop({ default: null, nullable: true })
  short_detail: string;

  @Prop({ default: null, nullable: true })
  rating: number;

}

export const HomeTestimonialsSchema = SchemaFactory.createForClass(HomeTestimonials);