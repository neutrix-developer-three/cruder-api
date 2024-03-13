import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class ProductComponentUiCms extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  heading_font_color: string;

  @Prop({ default: null, nullable: true })
  product_background_color: string;

  @Prop({ default: null, nullable: true })
  product_detail_background_color: string;

}

export const ProductComponentUiCmsSchema = SchemaFactory.createForClass(ProductComponentUiCms);
