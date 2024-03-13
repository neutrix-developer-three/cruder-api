import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class WhyChooseUsCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    title: string;

    @Prop({ default: null, nullable: true })
    subtitle: string;

    @Prop({ default: null, nullable: true })
    image: string;

    @Prop({ default: null, nullable: true })
    short_detail: string;

    @Prop({ default: null, nullable: true })
    choose_us_title_one: string;

    @Prop({ default: null, nullable: true })
    choose_us_details_one: string;

    @Prop({ default: null, nullable: true })
    choose_us_title_two: string;

    @Prop({ default: null, nullable: true })
    choose_us_details_two: string;

}

export const WhyChooseUsCmsSchema = SchemaFactory.createForClass(WhyChooseUsCms);
