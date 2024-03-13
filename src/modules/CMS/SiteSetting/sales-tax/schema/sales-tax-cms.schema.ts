import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class SalesTaxCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    title: string;

    @Prop({ default: null, nullable: true })
    dis_amount: string;
}

export const SalesTaxCmsSchema = SchemaFactory.createForClass(SalesTaxCms);
