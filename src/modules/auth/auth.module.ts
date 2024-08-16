import { Module } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { AuthController } from 'src/modules/auth/controllers/auth.controller';
import { configLoaderHelper } from 'src/shared/helpers/config-loader.helper';
import { PrismaService } from 'src/shared/modules/prisma/services/prisma.service';
import { LoggerService } from 'src/shared/modules/logger/services/logger.service';
import { UsersModule } from 'src/modules/users/users.module';
import { UsersService } from 'src/modules/users/services/users.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: configLoaderHelper().jwt.secret,
      signOptions: { expiresIn: configLoaderHelper().jwt.expire },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    PrismaService,
    LoggerService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
