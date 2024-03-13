import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class PromotionalPopupCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    title: string;

    @Prop({ default: null, nullable: true })
    image: string;

    @Prop({ default: null, nullable: true })
    logo: string;

    @Prop({ default: null, nullable: true })
    button_text: string;

    @Prop({ default: null, nullable: true })
    button_link: string;

    @Prop({ default: null, nullable: true })
    button_color: string;

    @Prop({ default: null, nullable: true })
    which_page: string[];

    
}

export const PromotionalPopupCmsSchema = SchemaFactory.createForClass(PromotionalPopupCms);
