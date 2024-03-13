import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../../../core/abstract-entity';

@Schema({ timestamps: true, id: true, versionKey: false })
export class AboutPageBannerCMS extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    heading: string;

    @Prop({ default: null, nullable: true })
    backgroundImage: string;
}

export const AboutPageBannerCMSSchema = SchemaFactory.createForClass(AboutPageBannerCMS);