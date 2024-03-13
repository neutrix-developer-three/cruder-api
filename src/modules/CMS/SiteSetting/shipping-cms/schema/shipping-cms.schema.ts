import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class ShippingCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    banner_title: string;

    @Prop({ default: null, nullable: true })
    banner_image: string;

    @Prop({ default: null, nullable: true })
    title: string;

    @Prop({ default: null, nullable: true })
    details: string;

    @Prop({ default: null, nullable: true })
    destination_zip_code: string;


}

export const ShippingCmsSchema = SchemaFactory.createForClass(ShippingCms);
