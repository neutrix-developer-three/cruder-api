import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class OurProcessServiceOne extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  title: string;

  @Prop({ default: null, nullable: true })
  image: string;

  @Prop({ default: null, nullable: true })
  short_detail: string;

  @Prop({ default: null, nullable: true })
  position: string;

}

export const OurProcessServiceOneSchema = SchemaFactory.createForClass(OurProcessServiceOne);