import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class ReturnPageCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    returnPageTitle: string;

    @Prop({ default: null, nullable: true })
    returnPageMetaKeyword: string;

    @Prop({ default: null, nullable: true })
    returnPageMetaDescription: string;
}

export const ReturnPageCmsSchema = SchemaFactory.createForClass(ReturnPageCms);
