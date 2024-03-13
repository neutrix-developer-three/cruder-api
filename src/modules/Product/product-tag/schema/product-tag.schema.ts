import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';


@Schema({ timestamps: true, id: true, versionKey: false })
export class ProductTag extends AbstractDocument {

  @Prop({ default: null, nullable: true })
  name: string;

}

export const ProductTagSchema = SchemaFactory.createForClass(ProductTag);