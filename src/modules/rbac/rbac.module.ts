import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import JwtConfigService from 'src/core/jwt/jwt-config.service';
import JwtHelper from 'src/core/jwt/jwt.helper';
import { PagesSchema } from './schema/pages.schema';
import { RbacController } from './rbac.controller';
import { RbacService } from './rbac.service';
import { UsersSchema } from '../CRUD/users/schema/users.schema';
import { RoleSchema } from './schema/role.schema';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    MongooseModule.forFeature([
      { name: 'Users', schema: UsersSchema },
      { name: 'app_pages', schema: PagesSchema },
      { name: 'role', schema: RoleSchema },
    ]),
  ],
  controllers: [RbacController],
  providers: [RbacService, JwtHelper],
})
export class RbacModule {}
