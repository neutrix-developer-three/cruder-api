import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class SiteTitleCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    homePageTitle: string;

    @Prop({ default: null, nullable: true })
    homePageMetaKeyword: string;

    @Prop({ default: null, nullable: true })
    homePageMetaDescription: string;

    @Prop({ default: null, nullable: true })
    shopPageTitle: string;

    @Prop({ default: null, nullable: true })
    shopPageMetaKeyword: string;

    @Prop({ default: null, nullable: true })
    shopPageMetaDescription: string;


    @Prop({ default: null, nullable: true })
    aboutUsPageTitle: string;

    @Prop({ default: null, nullable: true })
    aboutUsPageMetaKeyword: string;

    @Prop({ default: null, nullable: true })
    aboutUsPageMetaDescription: string;

    @Prop({ default: null, nullable: true })
    ourProcessPageTitle: string;

    @Prop({ default: null, nullable: true })
    ourProcessPageMetaKeyword: string;

    @Prop({ default: null, nullable: true })
    ourProcessPageMetaDescription: string;

    @Prop({ default: null, nullable: true })
    contactUsPageTitle: string;

    @Prop({ default: null, nullable: true })
    contactUsPageMetaKeyword: string;

    @Prop({ default: null, nullable: true })
    contactUsPageMetaDescription: string;

    @Prop({ default: null, nullable: true })
    blogPageTitle: string;

    @Prop({ default: null, nullable: true })
    blogPageMetaKeyword: string;

    @Prop({ default: null, nullable: true })
    blogPageMetaDescription: string;
}

export const SiteTitleCmsSchema = SchemaFactory.createForClass(SiteTitleCms);
