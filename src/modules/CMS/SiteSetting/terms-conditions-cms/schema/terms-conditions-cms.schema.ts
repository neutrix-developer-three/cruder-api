import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class TermsConditionsCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    banner_title: string;

    @Prop({ default: null, nullable: true })
    banner_image: string;

    @Prop({ default: null, nullable: true })
    title: string;

    @Prop({ default: null, nullable: true })
    details: string;

}

export const TermsConditionsCmsSchema = SchemaFactory.createForClass(TermsConditionsCms);
