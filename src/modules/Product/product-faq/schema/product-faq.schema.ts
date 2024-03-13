import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';
import { Schema as MongooseSchema } from 'mongoose';
import { Product } from '../../product/schema/product.schema';
import { ProductFaqType } from '../product-faq-type';


@Schema({ timestamps: true, id: true, versionKey: false })
export class ProductFaq extends AbstractDocument {

  @Prop({ default: null, nullable: true })
  productId: string;

  @Prop({default: null,nullable: true, type:MongooseSchema.Types.ObjectId, ref: 'products' })
  product: Product;

  @Prop({ default: null, nullable: true })
  faq: ProductFaqType[];

  @Prop({ default: null, nullable: true })
  author_name: string;
}

export const ProductFaqSchema = SchemaFactory.createForClass(ProductFaq);