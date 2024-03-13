import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class OrderDetails extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  orderId: string;

  @Prop({ default: null, nullable: true })
  customerId: string;

  @Prop({ default: null, nullable: true })
  customerName: string;

  @Prop({ default: null, nullable: true })
  productId: string;

  @Prop({ default: null, nullable: true })
  productName: string;

  @Prop({ default: null, nullable: true })
  productImage: string;

  @Prop({ default: null, nullable: true })
  quantity: number;

  @Prop({ default: null, nullable: true })
  price: number;

  @Prop({ default: null, nullable: true })
  discountWithPrice: number;

  @Prop({ default: null, nullable: true })
  totalDiscountWithPrice: number;

  @Prop({ default: null, nullable: true })
  discountAmount: number;

  @Prop({ default: null, nullable: true })
  totalAmount: number;

  @Prop({ default: null, nullable: true })
  isReturn: string;

  @Prop({ default: null, nullable: true })
  tax_rate: number;

  @Prop({ default: null, nullable: true })
  ct: string;


}

export const OrderDetailsSchema = SchemaFactory.createForClass(OrderDetails);