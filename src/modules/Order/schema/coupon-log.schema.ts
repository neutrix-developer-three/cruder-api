import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class CouponLog extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  user_id: string;

  @Prop({ default: null, nullable: true })
  user_name: string;

  @Prop({ default: null, nullable: true })
  order_id: string;

}

export const CouponLogSchema = SchemaFactory.createForClass(CouponLog);