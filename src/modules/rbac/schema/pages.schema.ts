import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';
@Schema({ timestamps: true, id: true, versionKey: false })
export class Pages extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    displayName: string;

    @Prop({ default: null, nullable: true })
    routeName: string;
}

export const PagesSchema = SchemaFactory.createForClass(Pages);