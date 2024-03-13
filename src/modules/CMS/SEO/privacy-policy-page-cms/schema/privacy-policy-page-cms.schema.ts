import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class PrivacyPolicyPageCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    privacyPolicyPageTitle: string;

    @Prop({ default: null, nullable: true })
    privacyPolicyPageMetaKeyword: string;

    @Prop({ default: null, nullable: true })
    privacyPolicyPageMetaDescription: string;
}

export const PrivacyPolicyPageCmsSchema = SchemaFactory.createForClass(PrivacyPolicyPageCms);
