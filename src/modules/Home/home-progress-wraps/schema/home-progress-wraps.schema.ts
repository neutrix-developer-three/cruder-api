import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class HomeProgressWraps extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  name: string;

  @Prop({ default: null, nullable: true })
  content: string;

}

export const HomeProgressWrapsSchema = SchemaFactory.createForClass(HomeProgressWraps);