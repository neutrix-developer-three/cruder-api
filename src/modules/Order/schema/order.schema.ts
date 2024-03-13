import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';
import { Schema as MongooseSchema } from 'mongoose';
import { Users } from 'src/modules/CRUD/users/schema/users.schema';

@Schema({ timestamps: true, id: true, versionKey: false })
export class Order extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  orderId: string;

  @Prop({ default: null, nullable: true })
  trackingNumber: string;

  @Prop({ default: null, nullable: true })
  customerId: string;

  @Prop({default: null,nullable: true, type:MongooseSchema.Types.ObjectId, ref: 'Users' })
  user: Users;

  @Prop({ default: null, nullable: true })
  customerName: string;

  @Prop({ default: null, nullable: true })
  totalQuantity: number;

  @Prop({ default: null, nullable: true })
  totalAmount: number;

  @Prop({ default: null, nullable: true })
  totalDiscountAmount: number;

  @Prop({ default: null, nullable: true })
  paymentMethodId: number;

  @Prop({ default: null, nullable: true })
  paymentMethodName: string;

  @Prop({ default: null, nullable: true })
  shippingMethodId: string;

  @Prop({ default: null, nullable: true })
  shippingMethodName: string;

  @Prop({ default: null, nullable: true })
  shippingMethodPrice: number;

  @Prop({ default: null, nullable: true })
  paymentStatus: string;

  @Prop({ default: null, nullable: true })
  deliveryStatus: string;

  @Prop({ default: null, nullable: true })
  sales_tax: number;

  @Prop({ default: null, nullable: true })
  remarks: string;

  @Prop({ default: null, nullable: true })
  status: string;

  @Prop({ default: null, nullable: true })
  isManual: string;

  @Prop({ default: null, nullable: true })
  isFreeShipping: string;

  @Prop({ default: null, nullable: true })
  coupon_amount: number;

  @Prop({ default: null, nullable: true })
  couponCode: string;

  @Prop({ default: null, nullable: true })
  isReturn: string;

  @Prop({ default: null, nullable: true })
  ct: string;

  

}

export const OrderSchema = SchemaFactory.createForClass(Order);