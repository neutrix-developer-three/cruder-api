import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class AboutUsPageCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    banner_title: string;

    @Prop({ default: null, nullable: true })
    banner_image: string;

    @Prop({ default: null, nullable: true })
    team_title: string;

    @Prop({ default: null, nullable: true })
    team_subtitle: string;

    @Prop({ default: null, nullable: true })
    team_short_detail: string;

    @Prop({ default: null, nullable: true })
    offer_title: string;

    @Prop({ default: null, nullable: true })
    offer_subtitle: string;

}

export const AboutUsPageCmsSchema = SchemaFactory.createForClass(AboutUsPageCms);
