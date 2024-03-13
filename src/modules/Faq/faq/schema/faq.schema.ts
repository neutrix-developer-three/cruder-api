import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class Faq extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  question: string;

  @Prop({ default: null, nullable: true })
  answer: string;

  @Prop({ default: null, nullable: true })
  author_name: string;

}

export const FaqSchema = SchemaFactory.createForClass(Faq);