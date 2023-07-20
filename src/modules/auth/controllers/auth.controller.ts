import { UsersEntity } from '@/modules/users/entities/users.entity';
import {
  Controller,
  Post,
  Req,
  HttpCode,
  HttpStatus,
  Body,
  Get,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { CreateUserDTO } from '@/modules/users/dto/create.dto';
import { LocalAuth, Reauth } from '@/common/decorators/auth.decorator';
import { Authenticate } from '@/common/interfaces/authenticated.interface';
import { GoogleService } from '../services/google.service';
interface IRequest {
  user: UsersEntity;
}
type GoogleRequest = FastifyRequest & {
  server: { googleOAuth2: any; googleOAuth2Mobile: any };
};

type GoogleResponse = {
  token: {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
    id_token: string;
    expires_at: string;
  };
};
@ApiTags('auth')
@Controller({
  version: '1',
  path: '/auth',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleService: GoogleService,
  ) {}

  @LocalAuth()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Req() req: IRequest) {
    return this.authService.login(req.user);
  }
  @Post('/register')
  async store(@Body() body: CreateUserDTO) {
    return this.authService.register(body);
  }

  @Reauth()
  @Post('/refresh')
  async refresh(@Req() req: Authenticate.IAuthenticatedUser) {
    return this.authService.reAuth({
      id: req.user.id,
      email: req.user.email,
    });
  }

  @Get('google/callback')
  async googleLoginCallback(
    @Req() req: GoogleRequest,
    // @Res() res: FastifyReply,
  ) {
    const data: GoogleResponse =
      await req.server.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(
        req,
      );
    const user = await this.googleService.getUserInfo(data.token.access_token);

    return this.authService.register({
      email: user.email,
      name: `${user.given_name} ${user.family_name}`,
      password: user.id,
    });
  }

  @Get('mobile/google/callback')
  async googleMobileLoginCallback(
    @Req() req: GoogleRequest,
    // @Res() res: FastifyReply,
  ) {
    const data: GoogleResponse =
      await req.server.googleOAuth2Mobile.getAccessTokenFromAuthorizationCodeFlow(
        req,
      );
    const user = await this.googleService.getUserInfo(data.token.access_token);
    console.log(user);
    return await this.authService.googleAuthenticate({
      email: user.email,
      name: `${user.given_name} ${user.family_name}`,
      password: user.id,
    });
  }
}
