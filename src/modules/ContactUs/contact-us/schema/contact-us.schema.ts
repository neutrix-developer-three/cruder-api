import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class ContactUs extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  name: string;

  @Prop({ default: null, nullable: true })
  email: string;

  @Prop({ default: null, nullable: true })
  company: string;

  @Prop({ default: null, nullable: true })
  subject: string;

  @Prop({ default: null, nullable: true })
  message: string;

}

export const ContactUsSchema = SchemaFactory.createForClass(ContactUs);