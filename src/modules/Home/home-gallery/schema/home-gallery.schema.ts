import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class HomeGallery extends AbstractDocument {
  @Prop({ default: null, nullable: true })
  title: string;

  @Prop({ default: null, nullable: true })
  image: string;

  @Prop({ default: null, nullable: true })
  link: string;

}

export const HomeGallerySchema = SchemaFactory.createForClass(HomeGallery);