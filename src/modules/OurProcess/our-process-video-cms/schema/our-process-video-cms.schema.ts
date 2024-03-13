import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class OurProcessVideoCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    title: string;

    @Prop({ default: null, nullable: true })
    subtitle: string;

    @Prop({ default: null, nullable: true })
    image: string;

    @Prop({ default: null, nullable: true })
    short_detail: string;

    @Prop({ default: null, nullable: true })
    video_link: string;

}

export const OurProcessVideoCmsSchema = SchemaFactory.createForClass(OurProcessVideoCms);
