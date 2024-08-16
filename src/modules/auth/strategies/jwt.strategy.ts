import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/modules/users/services/users.service';
import { configLoaderHelper } from 'src/shared/helpers/config-loader.helper';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private _aceleraUsersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configLoaderHelper().jwt.secret,
    });
  }

  async validate(payload: { sub: number; username: string }) {
    const user = await this._aceleraUsersService.findUserByUsernameToLogin(
      payload.username,
    );
    user.password = undefined;
    return { id: payload.sub, username: payload.username, data: user };
  }
}
