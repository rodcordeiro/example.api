// import { EncryptUtils } from '@/common/utils/encrypt.util';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from 'jsonwebtoken';
import { EncryptUtils } from '@/common/utils/encrypt.util';

interface IJwtPayload extends JwtPayload {
  payload: string;
}
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreException: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }

  async validate(payload: IJwtPayload) {
    const data = EncryptUtils.decrypt(payload.payload, process.env.ENC_SECRET);
    return { id: data.id, email: data.email };
  }
}
