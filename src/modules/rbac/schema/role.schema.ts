import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';
import { Pages } from './pages.schema';
import { Schema as MongooseSchema } from 'mongoose';
@Schema({ timestamps: true, id: true, versionKey: false })
export class Role extends AbstractDocument {
    @Prop({ default: null, nullable: true })
    roleName: string;

    @Prop({default: null, nullable: true, type: [{ type: MongooseSchema.Types.ObjectId, ref: 'app_pages' }] })
    pageAccess: Pages[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);