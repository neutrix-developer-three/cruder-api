import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class CartPageComponentUiCms extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  add_to_cart_button_bg_color: string;

  @Prop({ default: null, nullable: true })
  add_to_cart_button_font_color: string;
  
  @Prop({ default: null, nullable: true })
  description_active_bg_color: string;

  @Prop({ default: null, nullable: true })
  description_active_font_color: string;

  @Prop({ default: null, nullable: true })
  description_default_bg_color: string;

  @Prop({ default: null, nullable: true })
  description_default_font_color: string;

}

export const CartPageComponentUiCmsSchema = SchemaFactory.createForClass(CartPageComponentUiCms);
