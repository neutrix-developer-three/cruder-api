import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';
import { StatusEnumType } from 'src/utils/enum.utils';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, id: true, versionKey: false })
export class ProductCategory extends AbstractDocument {

  @Prop({ default: null, nullable: true })
  categoryId: string;

  @Prop({default: null,nullable: true, type:MongooseSchema.Types.ObjectId, ref: 'product_categories' })
  category: ProductCategory;

  @Prop({ default: null, nullable: true })
  name: string;

  @Prop({ default: null, nullable: true })
  banner_image: string;

  @Prop({ default: null, nullable: true })
  banner_title: string;

  @Prop({ default: null, nullable: true })
  detail: string;

  @Prop({ default: null, nullable: true })
  category_fill: string;

  @Prop({ default: null, nullable: true })
  slug: string;

  @Prop({ default: 0, nullable: true })
  position: number;


  @Prop({
    default: 'Active',
    enum: StatusEnumType
  })
  status: StatusEnumType;


}

export const ProductCategorySchema = SchemaFactory.createForClass(ProductCategory);