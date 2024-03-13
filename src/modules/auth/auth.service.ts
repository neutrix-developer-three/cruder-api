import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import { ResponseUtils } from 'src/utils/response.utils';
import { v4 as uuidv4 } from 'uuid';
import JwtHelper from '../../core/jwt/jwt.helper';
import { Constants } from '../../utils/constants';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../CRUD/users/schema/users.schema';
import { UsersRepository } from '../CRUD/users/users.repository';
import CryptoUtils from 'src/utils/crypto.utils';
import { DoSpacesService } from '../SpacesModule/SpacesService/doSpacesService';
import { UploadedMulterFileI } from '../SpacesModule/SpacesService';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { GoogleApiService } from 'src/core/services/google.api.service';
import { CreateUsersDto } from '../CRUD/users/dto/create-users.dto';
import { FacebookLoginDto } from './dto/facebook-login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtHelper: JwtHelper,
        private readonly doSpaceService: DoSpacesService,
        private readonly googleApiService: GoogleApiService,
        @InjectModel('Users') private readonly usersModel: Model<Users>
    ) { }

    private readonly usersRepository = new UsersRepository(this.usersModel);

    async login(dto: LoginAuthDto): Promise<any> {
        const { email, password } = dto;
        const data = await this.usersRepository.findOneByFilterQuery({ email: email })

        if (!data) {
            throw new NotFoundException(
                Constants.NOT_FOUND,
            );
        }

        const resData = await this.authenticateUser(
            password,
            data
        )
        if (resData == null) {
            // handle unauth
            throw new UnauthorizedException(
                Constants.UNAUTH_REQ
            );
        }
        return resData;
    }

    async customerLogin(dto: LoginAuthDto): Promise<any> {
        const { email, password } = dto;
        const data = await this.usersRepository.findOneCustomerByFilterQuery({ email: email })

        if (!data) {
            throw new NotFoundException(
                Constants.NOT_FOUND,
            );
        }

        const resData = await this.authenticateUser(
            password,
            data
        )
        if (resData == null) {
            // handle unauth
            throw new UnauthorizedException(
                Constants.UNAUTH_REQ
            );
        }
        return resData;
    }

    async authenticateUser(
        password: string,
        user: Users
    ): Promise<any> {
        const { password: passwordHash, ...entityWithoutPassword } = user;

        const matched = await CryptoUtils.compare(password, passwordHash);
        if (matched) {
            const token = this.jwtHelper.generateToken(
                {
                    userId: entityWithoutPassword._id
                },
                '180d'
            );
            return {
                token: token,
                user: entityWithoutPassword
            };
        }
        return null;
    }

    async register(dto: RegisterAuthDto,
        files: {
          image?: UploadedMulterFileI;
        }): Promise<Users | Error> {
        const checkCustomer = await this.usersRepository.findOneUserByFilterQuery({
            email: dto.email
        });
        if (checkCustomer) {
            throw new BadRequestException(`Customer already exists!`);
        }
        if (files && files.image) {
            const image: any = await this.doSpaceService.uploadFile(
                files.image[0],
                'chillMedicatedUsers/',
            );
            dto.image = image;
            } else
            dto.image =
                'https://neutrix-site.nyc3.digitaloceanspaces.com/default.png';
        
        if(dto.fullName){
            const splitFullName = dto.fullName.split(' ');
            dto.firstName=splitFullName[0];
            if(splitFullName.length>1){
                const fullName  = dto.fullName;
                dto.lastName = fullName.substring(dto.firstName.length+1);
            }
        }
        const data = await this.usersRepository.createEntity(dto);

        if (!data) {
            throw new BadRequestException(
                Constants.CREATE_FAILED,
            );
        }

        const { email, password } = dto;
        const loginData = await this.customerLogin({
            email: email,
            password: password
        });
        return ResponseUtils.successResponseHandler(201, "Customer registered successfully!", "data", loginData);
    }

    async validateRequest(req: any): Promise<boolean> {
        try {
            const bearerToken = req.headers.authorization;
            const bearer = 'Bearer ';
            if (!bearerToken || !bearerToken.startsWith(bearer)) {
                return false;
            }
            const token = bearerToken.replace(bearer, '');
            const jwtPayload = this.jwtHelper.verifyToken(token);
            const data = await this.usersRepository.findOneEntity(jwtPayload.userId);
            if (!data || data instanceof Error) {
                return false;
            }

            req.data = data;

            return true;
        } catch (e) {
            return false;
        }
    }

    async changePassword(dto:ChangePasswordDto, user:Users) : Promise<any | Error> {
        const {oldPassword,newPassword} = dto;
        const matched = await CryptoUtils.compare(oldPassword, user.password);
        if(!matched){
          throw new BadRequestException("Old Password Doesn't match!");
        }
        const data = await this.usersRepository.updatePasswordEntity(user._id.toString(), dto);
        return ResponseUtils.successResponseHandler(
          200,
          'Password changed successfully!',
          'data',
          data,
        );
    
      }


      async doGoogleLoginService(dto: GoogleLoginDto) {
        try{
            const {data} = await this.googleApiService.getUserInfo(dto?.token);
            const email = data?.email;
            const name = data?.name;
            if(!name) throw new NotFoundException('Name not found');
            const staticPass = '12345';
            let loginResponse = null;
            const checkUserEmail = await this.usersRepository.findOneUserByFilterQuery({email:email});
            if(checkUserEmail){
                await this.usersRepository.updatePasswordEntity(
                    checkUserEmail?._id.toString(),
                    {newPassword:staticPass} as ChangePasswordDto,
                );
                loginResponse = await this.customerLogin({
                    email: email,
                    password: staticPass
                });
            }else{
                let firstName = name
                let lastName=null;
                if(name){
                    const splitFullName = name.split(' ');
                    firstName=splitFullName[0];
                    if(splitFullName.length>1){
                        lastName = name.substring(firstName.length+1);
                    }
                }
                const userCreateDto = {
                    fullName:name,
                    firstName: firstName,
                    lastName:lastName,
                    email: email,
                    userType:'customer',
                    password: staticPass,
                };
                const userCreate = await this.usersRepository.createEntity(
                    userCreateDto as CreateUsersDto,
                );
                let dtoLogin = {
                    email: email,
                    password: staticPass,
                };
                loginResponse = await this.customerLogin(dtoLogin as LoginAuthDto);
            }
            
            
            return loginResponse;
        }catch (e) {
            console.log('catch error ', e?.response);
            if(e?.response?.statusCode===401){
                throw new UnauthorizedException( e.response?.message);
              }else if(e?.response?.statusCode===400){
                throw new BadRequestException( e.response?.message);
              }else if(e?.response?.statusCode===404){
                throw new NotFoundException( e.response?.message);
              }else{
                throw new InternalServerErrorException('Internal server error');
              }
        }
    }

    async doFacebookLogin(dto: FacebookLoginDto) {           
        const email = dto?.email;
        const name = dto?.name;
        const staticPass = '12345';
        let loginResponse = null;
        const checkUserEmail = await this.usersRepository.findOneUserByFilterQuery({email:email});
        if(checkUserEmail){
            await this.usersRepository.updatePasswordEntity(
                checkUserEmail?._id.toString(),
                {newPassword:staticPass} as ChangePasswordDto,
            );
            loginResponse = await this.customerLogin({
                email: email,
                password: staticPass
            });
        }else{
            let firstName = name
            let lastName=null;
            if(name){
                const splitFullName = name.split(' ');
                firstName=splitFullName[0];
                if(splitFullName.length>1){
                    lastName = name.substring(firstName.length+1);
                }
            }
            const userCreateDto = {
                fullName:name,
                firstName: firstName,
                lastName:lastName,
                email: email,
                userType:'customer',
                password: staticPass,
            };
            const userCreate = await this.usersRepository.createEntity(
                userCreateDto as CreateUsersDto,
            );
            let dtoLogin = {
                email: email,
                password: staticPass,
            };
            loginResponse = await this.customerLogin(dtoLogin as LoginAuthDto);
        }
        
        return loginResponse;
    }

}
