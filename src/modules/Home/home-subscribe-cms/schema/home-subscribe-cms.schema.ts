import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class HomeSubscribeCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    title: string;

    @Prop({ default: null, nullable: true })
    image: string;

    @Prop({ default: null, nullable: true })
    placeholder_text: string;

    @Prop({ default: null, nullable: true })
    button_text: string;
    
}

export const HomeSubscribeCmsSchema = SchemaFactory.createForClass(HomeSubscribeCms);
