import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';
import { ProductReviewStatusEnumType, StatusEnumType } from 'src/utils/enum.utils';
import { Schema as MongooseSchema } from 'mongoose';
import { Product } from '../../product/schema/product.schema';

@Schema({ timestamps: true, id: true, versionKey: false })
export class ProductReview extends AbstractDocument {

  @Prop({ default: null, nullable: true })
  productId: string;

  @Prop({default: null,nullable: true, type:MongooseSchema.Types.ObjectId, ref: 'products' })
  product: Product;

  @Prop({ default: null, nullable: true })
  userId: string;

  @Prop({ default: null, nullable: true })
  reviewerName: string;

  @Prop({ default: null, nullable: true })
  reviewerImage: string;

  @Prop({ default: null, nullable: true })
  reviewerComment: string;

  @Prop({ default: null, nullable: true })
  reviewRating: number;

  @Prop({ default: null, nullable: true })
  reviewDate: string;

  @Prop({
    default: 'Pending',
    enum: ProductReviewStatusEnumType
  })
  reviewStatus: ProductReviewStatusEnumType;


}

export const ProductReviewSchema = SchemaFactory.createForClass(ProductReview);