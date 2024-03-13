import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class LogActivity extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    subject: string;
    
    @Prop({ default: null, nullable: true })
    url: string;

    @Prop({ default: null, nullable: true })
    method: string;

    @Prop({ default: null, nullable: true })
    ip: string;

    @Prop({ default: null, nullable: true })
    agent: string;

    @Prop({ default: null, nullable: true })
    user_id: string;

    @Prop({ default: null, nullable: true })
    user_name: string;
}

export const LogActivitySchema = SchemaFactory.createForClass(LogActivity);
