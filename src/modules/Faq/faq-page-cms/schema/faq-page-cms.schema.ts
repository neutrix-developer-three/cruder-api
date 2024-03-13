import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class FaqPageCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    banner_title: string;

    @Prop({ default: null, nullable: true })
    banner_image: string;

    @Prop({ default: null, nullable: true })
    page_title: string;

}

export const FaqPageCmsSchema = SchemaFactory.createForClass(FaqPageCms);
