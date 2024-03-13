import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class ProductMetaCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    productId: string;

    @Prop({ default: null, nullable: true })
    metaTitle: string;

    @Prop({ default: null, nullable: true })
    metaKeyword: string;

    @Prop({ default: null, nullable: true })
    metaDescription: string;
}

export const ProductMetaCmsSchema = SchemaFactory.createForClass(ProductMetaCms);
