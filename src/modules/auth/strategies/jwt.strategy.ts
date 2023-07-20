import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../services/auth.service';
import { EncryptUtils } from '@/common/utils/encrypt.util';

interface IPayload {
  /** user id */
  sub: string;
  /** user email */
  email: string;
  [k: string]: any;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreException: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: IPayload) {
    const data = EncryptUtils.decrypt(payload.payload, process.env.ENC_SECRET);
    return { id: data.id, email: data.email };
  }
}
