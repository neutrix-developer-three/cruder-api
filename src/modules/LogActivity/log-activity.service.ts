import { REQUEST } from '@nestjs/core';
import { LogActivity } from './schema/log-activity.schema';
import { Inject, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogActivityRepository } from './log-activity.repository';
import { ResponseUtils } from 'src/utils/response.utils';
import { Constants } from 'src/utils/constants';
import { LogFilterDto } from './dto/log-filter.dto';
import {Request} from 'express';
import { CreateLogActivityDto } from './dto/create-log-activity.dto';
import JwtHelper from 'src/core/jwt/jwt.helper';
import { Users } from '../CRUD/users/schema/users.schema';
import { UsersRepository } from '../CRUD/users/users.repository';


@Injectable()
export class LogActivityService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly jwtHelper: JwtHelper,
    @InjectModel('log_activities')
    private readonly logActivityModel: Model<LogActivity>,
    @InjectModel('Users') private readonly usersModel: Model<Users>,
    
) { }
private readonly logActivityRepository = new LogActivityRepository(
  this.logActivityModel
);
private readonly usersRepository = new UsersRepository(this.usersModel);
async createLog(subject:string): Promise<LogActivity | Error> {
  const logData ={} as CreateLogActivityDto;
  logData.subject=subject;
  if (this.request) {
    const headers = this.request?.headers;
    const userAgent = headers?.['user-agent'];
    const fullUrl = `${this.request?.protocol}://${this.request?.get('host')}${this.request?.originalUrl}`;
    const method = this.request?.method;
    const ip = this.request?.ip;
    logData.url=fullUrl;
    logData.method=method;
    logData.ip=ip;
    logData.agent=userAgent;
    try{
      const bearerToken = this.request.headers?.['authorization'];
      const bearer = 'Bearer ';
      if (bearerToken && bearerToken.startsWith(bearer)) {
          const token = bearerToken.replace(bearer, '');
          const jwtPayload = this.jwtHelper.verifyToken(token);
          const data = await this.usersRepository.findOneEntity(
              jwtPayload.userId
          );
          if(data){
            logData.user_id=data?._id?.toString();
            logData.user_name=data.fullName;
          }
      }
    } catch (e) {
      console.log('error ', e)
    }
            
  }
  //console.log('logData : ', logData);
  const createData = await this.logActivityRepository.createEntity(logData);
  return createData;
}

async findAll(filterDto:LogFilterDto): Promise<LogActivity[]> {
  const data = await this.logActivityRepository.paginate(filterDto);
  if (!data) {
    throw new NotFoundException(
      Constants.NOT_FOUND,
    );
  }
  return ResponseUtils.successResponseHandler(200, "Data fetched successfully", "data", data);
}

  
  



}
