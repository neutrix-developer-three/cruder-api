import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import JwtConfigService from 'src/core/jwt/jwt-config.service';
import JwtHelper from 'src/core/jwt/jwt.helper';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from '../CRUD/users/schema/users.schema';
import { DoSpacesService } from '../SpacesModule/SpacesService/doSpacesService';
import { DoSpacesServicerovider } from '../SpacesModule/SpacesService';
import { HttpModule } from '@nestjs/axios';
import { GoogleApiService } from 'src/core/services/google.api.service';

@Module({
    imports: [
        HttpModule.registerAsync({
            useFactory: () => ({
              timeout: 5000,
              maxRedirects: 5,
            }),
        }),
        MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
        JwtModule.registerAsync({
            useClass: JwtConfigService,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtHelper,DoSpacesService, DoSpacesServicerovider,GoogleApiService],
})
export class AuthModule {
}
