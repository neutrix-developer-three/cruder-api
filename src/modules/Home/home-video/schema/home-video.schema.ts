import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class HomeVideo extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  video: string;

  @Prop({ default: null, nullable: true })
  image: string;

}

export const HomeVideoSchema = SchemaFactory.createForClass(HomeVideo);