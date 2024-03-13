import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class CartCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    newUserWelcomeMessage: string;

    @Prop({ default: null, nullable: true })
    regularUserWelcomeMessage: string;

    @Prop({ default: null, nullable: true })
    footerMessage: string;
}

export const CartCmsSchema = SchemaFactory.createForClass(CartCms);
