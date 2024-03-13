import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class AuthorizePaymentConfigCms extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    api_login_id: string;
    
    @Prop({ default: null, nullable: true })
    transaction_key: string;

    @Prop({ default: null, nullable: true })
    account_status: string;
}

export const AuthorizePaymentConfigCmsSchema = SchemaFactory.createForClass(AuthorizePaymentConfigCms);
