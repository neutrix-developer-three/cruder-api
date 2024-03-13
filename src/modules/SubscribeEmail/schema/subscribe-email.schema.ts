import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class SubscribeEmail extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  email: string;
}

export const SubscribeEmailSchema = SchemaFactory.createForClass(SubscribeEmail);