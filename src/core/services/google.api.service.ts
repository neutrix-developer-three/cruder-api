import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class GoogleApiService {
  constructor(private readonly httpService: HttpService) {}

  async getUserInfo(accessToken: string): Promise<any> {
    const url = 'https://www.googleapis.com/oauth2/v2/userinfo';
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await firstValueFrom(
        this.httpService.get(url, { headers }).pipe(
          catchError((error: AxiosError) => {
            console.log('error from api : ', error.response.data);
            throw new UnauthorizedException('Invalid google access token');
          }),
        ),
      );
      return response;
  }
}
