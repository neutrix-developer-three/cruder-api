import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class HeroSectionCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    title: string;

    @Prop({ default: null, nullable: true })
    image: string;

    @Prop({ default: null, nullable: true })
    subtitle: string;

    @Prop({ default: null, nullable: true })
    button_text: string;

    @Prop({ default: null, nullable: true })
    button_link: string;

    
}

export const HeroSectionCmsSchema = SchemaFactory.createForClass(HeroSectionCms);
