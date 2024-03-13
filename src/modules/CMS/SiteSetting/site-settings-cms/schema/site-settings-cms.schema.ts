import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class SiteSettingsCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    title: string;

    @Prop({ default: null, nullable: true })
    logo: string;

    @Prop({ default: null, nullable: true })
    email: string;

    @Prop({ default: null, nullable: true })
    phone: string;

    @Prop({ default: null, nullable: true })
    address: string;

    @Prop({ default: null, nullable: true })
    short_detail: string;


    @Prop({ default: null, nullable: true })
    footer_title_left: string;

    @Prop({ default: null, nullable: true })
    footer_title_right: string;

    @Prop({ default: null, nullable: true })
    facebook: string;

    @Prop({ default: null, nullable: true })
    twitter: string;

    @Prop({ default: null, nullable: true })
    instagram: string;

    @Prop({ default: null, nullable: true })
    pinterest: string;

    @Prop({ default: null, nullable: true })
    login_background: string;

    @Prop({ default: null, nullable: true })
    youtube: string;

    
}

export const SiteSettingsCmsSchema = SchemaFactory.createForClass(SiteSettingsCms);
