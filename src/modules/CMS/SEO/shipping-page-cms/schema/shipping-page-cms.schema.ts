import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class ShippingPageCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    shippingPageTitle: string;

    @Prop({ default: null, nullable: true })
    shippingPageMetaKeyword: string;

    @Prop({ default: null, nullable: true })
    shippingPageMetaDescription: string;
}

export const ShippingPageCmsSchema = SchemaFactory.createForClass(ShippingPageCms);
