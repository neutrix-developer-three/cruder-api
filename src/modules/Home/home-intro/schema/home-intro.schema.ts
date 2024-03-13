import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';
import { HomeIntroStatusEnumType } from 'src/utils/enum.utils';

@Schema({ timestamps: true, id: true, versionKey: false })
export class HomeIntro extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  title: string;

  @Prop({ default: null, nullable: true })
  image: string;

  @Prop({ default: null, nullable: true })
  subtitle: string;

  @Prop({ default: null, nullable: true })
  background_image: string;

  @Prop({ default: null, nullable: true })
  link: string;

  @Prop({
    default: null,nullable: true,
    enum: HomeIntroStatusEnumType
  })
  status: HomeIntroStatusEnumType;


}

export const HomeIntroSchema = SchemaFactory.createForClass(HomeIntro);