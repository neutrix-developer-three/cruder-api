import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/core/abstract-entity';
import { Role } from 'src/modules/rbac/schema/role.schema';
import { UserEnumType, UserStatusEnumType } from 'src/utils/enum.utils';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, id: true, versionKey: false })
export class Users extends AbstractDocument {
  @Prop({
    default: null,
    nullable: true,
  })
  fullName: string;

  @Prop({
    default: null,
    nullable: true,
  })
  firstName: string;

  @Prop({
    default: null,
    nullable: true,
  })
  lastName: string;

  @Prop({ required: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    default: null,
    nullable: true,
  })
  phone: string;

  @Prop({
    default: null,
    nullable: true,
  })
  address: string;


  @Prop({
    default: null,
    nullable: true,
  })
  city: string;

  @Prop({
    default: null,
    nullable: true,
  })
  post_code: string;

  @Prop({
    default: null,
    nullable: true,
  })
  country: string;


  @Prop({
    default: null,
    nullable: true,
  })
  image: string;

  @Prop({
    default: 'admin',
    enum: UserEnumType
  })
  userType: UserEnumType;

  @Prop({ default: null, nullable: true })
  role_id: string;

  @Prop({default: null,nullable: true, type:MongooseSchema.Types.ObjectId, ref: 'role' })
    role: Role;

  @Prop({
    default: 'Active',
    enum: UserStatusEnumType
  })
  status: UserStatusEnumType;
}

export const UsersSchema = SchemaFactory.createForClass(Users);