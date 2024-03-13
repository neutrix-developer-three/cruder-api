import { Body, Controller, HttpCode, HttpStatus, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
// import {AuthGuard} from 'src/core/guards/auth.guard';
import { Constants } from '../../utils/constants';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedMulterFileI } from '../SpacesModule/SpacesService';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { FacebookLoginDto } from './dto/facebook-login.dto';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';

@Controller({
    path: 'auth',
    version: Constants.API_VERSION_1
})
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post('/register')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    async register(@Body() dto: RegisterAuthDto,@UploadedFiles()
    files: {
      image?: UploadedMulterFileI;
    }) {
        return await this.authService.register(dto,files);
    }

    @Post('/customer-login')
    async userLogin(@Body() dto: LoginAuthDto) {
        return await this.authService.customerLogin(dto);
    }

    @Post('/login')
    async login(@Body() dto: LoginAuthDto) {
        return await this.authService.login(dto);
    }


    @Post('/validate-token')
    async verifyToken(@Req() req: any) {
        return await this.authService.validateRequest(req);
    }

    @Post('/change-password')
    @UseGuards(AuthGuard)
    async changePassword(@Body() dto: ChangePasswordDto,@Req() request) {
        const user = request?.user;
        return await this.authService.changePassword(dto, user);
    }

    @Post('admin/change-password')
    @UseGuards(AdminAuthGuard)
    async adminChangePassword(@Body() dto: ChangePasswordDto,@Req() request) {
        const user = request?.user;
        return await this.authService.changePassword(dto, user);
    }

    @Post('/google-login')
    doGoogleLogin(@Body() dto: GoogleLoginDto) {
        return this.authService.doGoogleLoginService(dto);
    }

    @Post('/facebook-login')
    doFacebookLogin(@Body() dto: FacebookLoginDto) {
        return this.authService.doFacebookLogin(dto);
    }



}
