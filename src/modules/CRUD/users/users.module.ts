import {Module} from "@nestjs/common";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersSchema } from "./schema/users.schema";
import JwtHelper from "src/core/jwt/jwt.helper";
import { JwtModule } from "@nestjs/jwt";
import JwtConfigService from "src/core/jwt/jwt-config.service";
import { DoSpacesService } from "src/modules/SpacesModule/SpacesService/doSpacesService";
import { DoSpacesServicerovider } from "src/modules/SpacesModule/SpacesService";
import { RoleSchema } from "src/modules/rbac/schema/role.schema";

@Module({
    imports: [
        JwtModule.registerAsync({
            useClass: JwtConfigService
        }),
        MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema },{ name: 'role', schema: RoleSchema }]),
    ],
    controllers: [UsersController],
    providers: [UsersService, JwtHelper,DoSpacesService, DoSpacesServicerovider]
})
export class UsersModule {
}
