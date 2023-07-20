import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

type GoogleDetails = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
};

@Injectable()
export class GoogleService {
  constructor(private readonly httpService: HttpService) {}
  async getUserInfo(token: string) {
    const info = await this.httpService.axiosRef.get<GoogleDetails>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`,
    );
    return info.data;
  }
}
