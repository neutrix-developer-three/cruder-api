import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';
import { StatusEnumType } from 'src/utils/enum.utils';
import { Schema as MongooseSchema } from 'mongoose';
import { ProductCategory } from '../../product-category/schema/product-category.schema';
import { Product } from '../../product/schema/product.schema';

@Schema({ timestamps: true, id: true, versionKey: false })
export class OfferProduct extends AbstractDocument {

  @Prop({ default: null, nullable: true })
  categoryId: string;

  @Prop({default: null,nullable: true, type:MongooseSchema.Types.ObjectId, ref: 'product_categories' })
  category: ProductCategory;

  @Prop({ default: null, nullable: true })
  productId: string;

  @Prop({default: null,nullable: true, type:MongooseSchema.Types.ObjectId, ref: 'products' })
  product: Product;

  @Prop({ default: null, nullable: true })
  image: string;


  @Prop({
    default: 'Active',
    enum: StatusEnumType
  })
  status: StatusEnumType;


}

export const OfferProductSchema = SchemaFactory.createForClass(OfferProduct);