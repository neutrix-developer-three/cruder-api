import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class ContactPageComponentUiCms extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  banner_font_color: string;

  @Prop({ default: null, nullable: true })
  contact_info_background_color: string;

  @Prop({ default: null, nullable: true })
  contact_form_background_color: string;

}

export const ContactPageComponentUiCmsSchema = SchemaFactory.createForClass(ContactPageComponentUiCms);
