import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class HomeAboutCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    title: string;

    @Prop({ default: null, nullable: true })
    image: string;

    @Prop({ default: null, nullable: true })
    subtitle: string;

    @Prop({ default: null, nullable: true })
    short_detail: string;

    @Prop({ default: null, nullable: true })
    about_info_icon_one: string;

    @Prop({ default: null, nullable: true })
    about_info_title_one: string;

    @Prop({ default: null, nullable: true })
    about_info_detail_one: string;

    @Prop({ default: null, nullable: true })
    about_info_icon_two: string;

    @Prop({ default: null, nullable: true })
    about_info_title_two: string;

    @Prop({ default: null, nullable: true })
    about_info_detail_two: string;

    @Prop({ default: null, nullable: true })
    button_text: string;

    @Prop({ default: null, nullable: true })
    button_link: string;

    
}

export const HomeAboutCmsSchema = SchemaFactory.createForClass(HomeAboutCms);
