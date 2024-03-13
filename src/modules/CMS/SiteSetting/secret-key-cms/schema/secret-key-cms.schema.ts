import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class SecretKeyCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    secretKey: string;
}

export const SecretKeyCmsSchema = SchemaFactory.createForClass(SecretKeyCms);
