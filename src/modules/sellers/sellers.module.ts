import { Module } from '@nestjs/common';
import { CellsModule } from 'src/modules//cells/cells.module';
import { UsersModule } from 'src/modules//users/users.module';
import { SellersController } from 'src/modules/sellers/controller/sellers.controller';
import { SellersService } from 'src/modules/sellers/services/sellers.services';
import { LoggerService } from 'src/shared/modules/logger/services/logger.service';
import { PrismaService } from 'src/shared/modules/prisma/services/prisma.service';

@Module({
  imports: [UsersModule, CellsModule],
  controllers: [SellersController],
  providers: [SellersService, PrismaService, LoggerService],
  exports: [SellersService],
})
export class SellersModule {}
