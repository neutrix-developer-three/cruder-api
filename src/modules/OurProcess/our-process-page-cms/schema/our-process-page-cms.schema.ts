import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class OurProcessPageCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    banner_title: string;

    @Prop({ default: null, nullable: true })
    banner_image: string;

    @Prop({ default: null, nullable: true })
    service_title: string;

    @Prop({ default: null, nullable: true })
    service_subtitle: string;

    @Prop({ default: null, nullable: true })
    image: string;

    @Prop({ default: null, nullable: true })
    button_text: string;

    @Prop({ default: null, nullable: true })
    button_link: string;

    @Prop({ default: null, nullable: true })
    section_two_service_title: string;

    @Prop({ default: null, nullable: true })
    section_two_service_subtitle: string;

    @Prop({ default: null, nullable: true })
    section_two_image: string;

    @Prop({ default: null, nullable: true })
    section_two_button_text: string;

    @Prop({ default: null, nullable: true })
    section_two_button_link: string;

}

export const OurProcessPageCmsSchema = SchemaFactory.createForClass(OurProcessPageCms);
