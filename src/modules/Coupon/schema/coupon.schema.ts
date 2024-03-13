import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CouponCodeEnumType, StatusEnumType } from 'src/utils/enum.utils';
import { Schema as MongooseSchema } from 'mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';
import { ProductCategory } from 'src/modules/Product/product-category/schema/product-category.schema';

@Schema({ timestamps: true, id: true, versionKey: false })
export class Coupon extends AbstractDocument {

  @Prop({ default: null, nullable: true })
  couponName: string;

  @Prop({ default: null, nullable: true })
  couponCode: string;

  @Prop({ default: null, nullable: true })
  quantity_discount_quota: string;

  @Prop({ default: null, nullable: true })
  category_id: string;

  @Prop({default: null,nullable: true, type:MongooseSchema.Types.ObjectId, ref: 'product_categories' })
  category: ProductCategory;

  @Prop({ default: null, nullable: true })
  expireDate: string;

  @Prop({
    default: null, nullable: true,
    enum: CouponCodeEnumType
  })
  couponTypes: CouponCodeEnumType;

  @Prop({ default: null, nullable: true })
  discount: number;

  @Prop({ default: null, nullable: true })
  exceedOrderAmount: number;

  @Prop({ default: null, nullable: true })
  cuponUsedTotal: number;

  @Prop({
    default: null, nullable: true,
    enum: StatusEnumType
  })
  status: StatusEnumType;


}

export const CouponSchema = SchemaFactory.createForClass(Coupon);