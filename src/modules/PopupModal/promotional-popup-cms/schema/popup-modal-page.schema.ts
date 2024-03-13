import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class PopupModalPage extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    name: string;

    @Prop({ default: null, nullable: true })
    route_name: string;
}

export const PopupModalPageSchema = SchemaFactory.createForClass(PopupModalPage);
