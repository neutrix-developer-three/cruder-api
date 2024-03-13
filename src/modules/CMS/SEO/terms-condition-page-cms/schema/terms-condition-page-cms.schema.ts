import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class TermsConditionPageCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    termsConditionPageTitle: string;

    @Prop({ default: null, nullable: true })
    termsConditionPageMetaKeyword: string;

    @Prop({ default: null, nullable: true })
    termsConditionPageMetaDescription: string;
}

export const TermsConditionPageCmsSchema = SchemaFactory.createForClass(TermsConditionPageCms);
