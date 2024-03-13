import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class SlugDetails extends AbstractDocument {

  @Prop({ default: null, nullable: true })
  slug: string;

  @Prop({ default: null, nullable: true })
  slug_id: string;

  @Prop({ default: null, nullable: true })
  type: string;


}

export const SlugDetailsSchema = SchemaFactory.createForClass(SlugDetails);