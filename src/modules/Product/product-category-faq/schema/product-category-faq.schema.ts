import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';
import { ProductCategory } from '../../product-category/schema/product-category.schema';
import { Schema as MongooseSchema } from 'mongoose';
import { ProductCategoryFaqType } from '../product-category-faq-type';


@Schema({ timestamps: true, id: true, versionKey: false })
export class ProductCategoryFaq extends AbstractDocument {

  @Prop({ default: null, nullable: true })
  categoryId: string;

  @Prop({default: null,nullable: true, type:MongooseSchema.Types.ObjectId, ref: 'product_categories' })
  category: ProductCategory;

  @Prop({ default: null, nullable: true })
  faq: ProductCategoryFaqType[];

  @Prop({ default: null, nullable: true })
  author_name: string;
}

export const ProductCategoryFaqSchema = SchemaFactory.createForClass(ProductCategoryFaq);