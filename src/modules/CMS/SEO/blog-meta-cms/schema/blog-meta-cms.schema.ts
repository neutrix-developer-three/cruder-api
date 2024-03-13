import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class BlogMetaCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    blogId: string;

    @Prop({ default: null, nullable: true })
    metaTitle: string;

    @Prop({ default: null, nullable: true })
    metaKeyword: string;

    @Prop({ default: null, nullable: true })
    metaDescription: string;
}

export const BlogMetaCmsSchema = SchemaFactory.createForClass(BlogMetaCms);
