import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';
import { HomeInstagramMediaEnumType } from 'src/utils/enum.utils';

@Schema({ timestamps: true, id: true, versionKey: false })
export class HomeInstagram extends AbstractDocument {

  @Prop({
    default: null,nullable: true,
    enum: HomeInstagramMediaEnumType
  })
  media_type: HomeInstagramMediaEnumType;

  @Prop({ default: null, nullable: true })
  permalink: string;

  @Prop({ default: null, nullable: true })
  media_url: string;

  @Prop({ default: null, nullable: true })
  username: string;

  @Prop({ default: null, nullable: true })
  caption: string;

  @Prop({ default: null, nullable: true })
  timestamp: Date;


}

export const HomeInstagramSchema = SchemaFactory.createForClass(HomeInstagram);