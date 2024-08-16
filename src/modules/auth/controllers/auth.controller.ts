import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { LocalAuthGuard } from 'src/modules/auth/guard/local-auth.guard';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { RequestWithUserType } from 'src/shared/@types';
import { UserLogged } from 'src/shared/@types/user-logged';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { User } from 'src/shared/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiBody({ type: LoginDto })
  async login(@Request() req: RequestWithUserType) {
    return await this.authService.login(req.user);
  }

  @Auth()
  @ApiOperation({ summary: 'authorization' })
  @Get('me')
  async me(@User() user: UserLogged) {
    return user;
  }
}
