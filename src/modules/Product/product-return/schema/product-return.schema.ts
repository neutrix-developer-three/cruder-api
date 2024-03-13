import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';
import { ProductReturnStatusEnumType } from 'src/utils/enum.utils';

@Schema({ timestamps: true, id: true, versionKey: false })
export class ProductReturn extends AbstractDocument {

  @Prop({ default: null, nullable: true })
  orderId: string;

  @Prop({ default: null, nullable: true })
  productId: string;

  @Prop({ default: null, nullable: true })
  productName: string;

  @Prop({ default: null, nullable: true })
  customerName: string;

  @Prop({ default: null, nullable: true })
  quantity: number;

  @Prop({ default: null, nullable: true })
  reason: string;

  @Prop({ default: null, nullable: true })
  itemPrice: number;

  @Prop({ default: null, nullable: true })
  totalPrice: number;

  @Prop({ default: null, nullable: true })
  sales_tax: number;

  @Prop({ default: null, nullable: true })
  payableAmount: number;

  @Prop({ default: null, nullable: true })
  updated_by: string;

  @Prop({
    default: 'Unapproved',
    enum: ProductReturnStatusEnumType
  })
  status: ProductReturnStatusEnumType;


}

export const ProductReturnSchema = SchemaFactory.createForClass(ProductReturn);