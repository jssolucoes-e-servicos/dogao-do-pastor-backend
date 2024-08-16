import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/modules/auth/services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      const user = await this.authService.validateUser(username, password);

      if (!user) {
        console.log(`Attempted login with username: ${username}`);
        throw new HttpException(
          'Usuário ou senha inválidos',
          HttpStatus.UNAUTHORIZED,
        );
      }

      return user;
    } catch (error) {
      throw new HttpException(
        'Falha ao verificar login',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
