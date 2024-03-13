import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class AboutUsCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    title: string;

    @Prop({ default: null, nullable: true })
    subtitle: string;

    @Prop({ default: null, nullable: true })
    image: string;

    @Prop({ default: null, nullable: true })
    short_detail: string;

    @Prop({ default: null, nullable: true })
    about_item_icon_one: string;

    @Prop({ default: null, nullable: true })
    about_item_title_one: string;

    @Prop({ default: null, nullable: true })
    about_item_icon_two: string;

    @Prop({ default: null, nullable: true })
    about_item_title_two: string;

    @Prop({ default: null, nullable: true })
    blog_button_text: string;

    @Prop({ default: null, nullable: true })
    blog_button_link: string;

}

export const AboutUsCmsSchema = SchemaFactory.createForClass(AboutUsCms);
