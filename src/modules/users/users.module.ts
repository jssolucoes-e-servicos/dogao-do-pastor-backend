import { Module } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';
import { LoggerService } from 'src/shared/modules/logger/services/logger.service';
import { PrismaService } from 'src/shared/modules/prisma/services/prisma.service';
import { UsersController } from './controllers/users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, LoggerService],
  exports: [UsersService],
})
export class UsersModule {}
