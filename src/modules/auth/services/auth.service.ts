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

  async validateUser(email: string, userPassword: string) {
    const user = await this.aceleraUsersService.findUserByEmailToLogin(email);
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

  // async login(user: { email: string; id: string }) {
  //   const payload = { email: user.email, sub: user.id };
  //   const token = this.jwtService.sign(payload);
  //   return {
  //     token: token,
  //     //user: user,

  //   };
  // }

  async login(user: { email: string; id: string }) {
    // Verificar se `companyBarber` existe no objeto `user`
    if ('companyBarber' in user) {
      // Se existir, remova-o do objeto `user`
      const { companyBarber, ...userWithoutCompany } = user;
  
      const payload = { email: userWithoutCompany.email, sub: userWithoutCompany.id };
      const token = this.jwtService.sign(payload);
      
      // Retorna o token de acesso e o usuário sem a propriedade `companyBarber`
      return {
        token: token,
        user: userWithoutCompany,
      };
    } else {
      // Se `companyBarber` não estiver presente, retorne o usuário sem modificação
      const payload = { email: user.email, sub: user.id };
      const token = this.jwtService.sign(payload);
      return {
        token: token,
        user: user,
      };
    }
  }
  
}