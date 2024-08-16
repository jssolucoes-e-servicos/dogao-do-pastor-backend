import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly aceleraUsersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, userPassword: string) {
    const user =
      await this.aceleraUsersService.findUserByUsernameToLogin(username);
    if (user) {
      const isPasswordValid = await compare(userPassword, user.password);
      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    return null;
  }

  async login(user: { username: string; id: string }) {
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    return {
      token: token,
      user: user,
    };
  }
}
