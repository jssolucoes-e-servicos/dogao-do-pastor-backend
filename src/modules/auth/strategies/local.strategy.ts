import { AuthService } from 'src/modules/auth/services/auth.service';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const user = await this.authService.validateUser(email, password);

      if (!user) {
        console.log(`Attempted login with email: ${email}`);
        throw new HttpException(
          'Email ou senha inválidos',
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
