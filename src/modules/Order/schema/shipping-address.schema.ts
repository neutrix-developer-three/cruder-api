import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class ShippingAddress extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  orderId: string;

  @Prop({ default: null, nullable: true })
  customerId: string;

  @Prop({ default: null, nullable: true })
  customerName: string;

  @Prop({ default: null, nullable: true })
  name: string;

  @Prop({ default: null, nullable: true })
  last_name: string;

  @Prop({ default: null, nullable: true })
  mobile: string;

  @Prop({ default: null, nullable: true })
  email: string;

  @Prop({ default: null, nullable: true })
  country: string;

  @Prop({ default: null, nullable: true })
  city: string;

  @Prop({ default: null, nullable: true })
  postCode: string;

  @Prop({ default: null, nullable: true })
  address: string;


}

export const ShippingAddressSchema = SchemaFactory.createForClass(ShippingAddress);