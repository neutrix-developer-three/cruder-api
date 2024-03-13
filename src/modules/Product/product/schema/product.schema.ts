import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';
import { DiscountEnumType, StatusEnumType } from 'src/utils/enum.utils';
import { Schema as MongooseSchema } from 'mongoose';
import { ProductCategory } from '../../product-category/schema/product-category.schema';
import { ProductTag } from '../../product-tag/schema/product-tag.schema';
import { ProductImages } from '../product-images.interface';

@Schema({ timestamps: true, id: true, versionKey: false })
export class Product extends AbstractDocument {

  @Prop({ default: null, nullable: true })
  categoryIds: string[];

  @Prop({default: null,nullable: true, type: [{ type:MongooseSchema.Types.ObjectId, ref: 'product_categories' }] })
  categories: ProductCategory[];

  @Prop({ default: null, nullable: true })
  name: string;

  @Prop({ default: null, nullable: true })
  image: string;

  @Prop({ type: Number, default: 0, nullable: true })
  price: number;

  @Prop({ type: Number, default: 0, nullable: true })
  cost: number;

  @Prop({ type: Number, default: 0, nullable: true })
  reorder: number;

  @Prop({ default: null, nullable: true, enum: DiscountEnumType })
  discount_type: DiscountEnumType;

  @Prop({ type: Number, default: null, nullable: true })
  discount_amount: number;

  @Prop({ type: Number, default: null, nullable: true })
  discount_total_amount: number;

  @Prop({type: Number, default: null, nullable: true })
  quantity: number;

  @Prop({ default: null, nullable: true })
  short_detail: string;

  @Prop({ default: null, nullable: true })
  long_detail: string;

  @Prop({ default: null, nullable: true })
  additional_info: string;

  @Prop({ default: null, nullable: true })
  recommendation_product_id: string;

  @Prop({default: null,nullable: true, type:MongooseSchema.Types.ObjectId, ref: 'products' })
  recommendation_product: Product;

  @Prop({ default: null, nullable: true })
  slug: string;

  @Prop({ default: null, nullable: true })
  product_tag_id: string;

  @Prop({default: null,nullable: true, type:MongooseSchema.Types.ObjectId, ref: 'product_tag' })
  product_tag: ProductTag;

  @Prop({ default: 0, nullable: true })
  position: number;

  @Prop({ default: null, nullable: true })
  image_alt_text: string;

  @Prop({ default: null, nullable: true })
  product_images_alt_text: ProductImages[];

  @Prop({ default: null, nullable: true })
  category_fill: string;

  @Prop({ default: 0, nullable: true })
  rating: number;


}

export const ProductSchema = SchemaFactory.createForClass(Product);