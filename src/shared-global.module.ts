import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from './modules/rbac/schema/role.schema';
import { UsersSchema } from './modules/CRUD/users/schema/users.schema';
import { JwtModule } from '@nestjs/jwt';
import JwtConfigService from './core/jwt/jwt-config.service';
import JwtHelper from './core/jwt/jwt.helper';
import { LogActivityService } from './modules/LogActivity/log-activity.service';
import { LogActivitySchema } from './modules/LogActivity/schema/log-activity.schema';
@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    MongooseModule.forFeature([
      { name: 'role', schema: RoleSchema },
      { name: 'Users', schema: UsersSchema },
      { name: 'log_activities', schema: LogActivitySchema },
    ])
  ],
  providers: [JwtHelper,LogActivityService],
  exports: [JwtModule, MongooseModule,JwtHelper,LogActivityService],
})
export class SharedGlobalModule {}
