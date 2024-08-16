import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { configLoaderHelper } from 'src/shared/helpers/config-loader.helper';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private _aceleraUsersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configLoaderHelper().jwt.secret,
    });
  }

  async validate(payload: { sub: number; email: string }) {
    let user = await this._aceleraUsersService.findUserByEmailToLogin(
      payload.email,
    );
    user.password = undefined;
    return { id: payload.sub, email: payload.email, data: user};
  }
}
