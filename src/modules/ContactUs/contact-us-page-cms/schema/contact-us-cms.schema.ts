import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class ContactUsCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    banner_title: string;

    @Prop({ default: null, nullable: true })
    banner_image: string;

    @Prop({ default: null, nullable: true })
    contact_info_title: string;

    @Prop({ default: null, nullable: true })
    contact_info_short_detail: string;

    @Prop({ default: null, nullable: true })
    image: string;

    @Prop({ default: null, nullable: true })
    location_title: string;

    @Prop({ default: null, nullable: true })
    location_subtitle: string;

    @Prop({ default: null, nullable: true })
    location_short_detail: string;

    @Prop({ default: null, nullable: true })
    location_background_image: string;

    @Prop({ default: null, nullable: true })
    location_name_one: string;

    @Prop({ default: null, nullable: true })
    location_address_one: string;

    @Prop({ default: null, nullable: true })
    location_name_two: string;

    @Prop({ default: null, nullable: true })
    location_address_two: string;

    @Prop({ default: null, nullable: true })
    button_text: string;

    @Prop({ default: null, nullable: true })
    email_icon: string;

    @Prop({ default: null, nullable: true })
    call_icon: string;

    @Prop({ default: null, nullable: true })
    social_icon_1: string;

    @Prop({ default: null, nullable: true })
    social_icon_1_bg: string;

    @Prop({ default: null, nullable: true })
    social_icon_2: string;

    @Prop({ default: null, nullable: true })
    social_icon_2_bg: string;

    @Prop({ default: null, nullable: true })
    social_icon_3: string;

    @Prop({ default: null, nullable: true })
    social_icon_3_bg: string;

    @Prop({ default: null, nullable: true })
    social_icon_4: string;

    @Prop({ default: null, nullable: true })
    social_icon_4_bg: string;

    @Prop({ default: null, nullable: true })
    social_icon_1_link: string;

    @Prop({ default: null, nullable: true })
    social_icon_2_link: string;

    @Prop({ default: null, nullable: true })
    social_icon_3_link: string;

    @Prop({ default: null, nullable: true })
    social_icon_4_link: string;

    @Prop({ default: null, nullable: true })
    form_text_color: string;

}

export const ContactUsCmsSchema = SchemaFactory.createForClass(ContactUsCms);
