import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class SubscribePageComponentUiCms extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  button_color: string;

  @Prop({ default: null, nullable: true })
  button_font_color: string;

  @Prop({ default: null, nullable: true })
  subscribe_background_color: string;

}

export const SubscribePageComponentUiCmsSchema = SchemaFactory.createForClass(SubscribePageComponentUiCms);
