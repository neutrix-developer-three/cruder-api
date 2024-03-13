import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class NewsletterPopupCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    title: string;

    @Prop({ default: null, nullable: true })
    image: string;

    @Prop({ default: null, nullable: true })
    email_title: string;

    @Prop({ default: null, nullable: true })
    email_placeholder_text: string;

    @Prop({ default: null, nullable: true })
    which_page: string[];

    @Prop({ default: null, nullable: true })
    button_text: string;

    @Prop({ default: null, nullable: true })
    button_color: string;

    
}

export const NewsletterPopupCmsSchema = SchemaFactory.createForClass(NewsletterPopupCms);
