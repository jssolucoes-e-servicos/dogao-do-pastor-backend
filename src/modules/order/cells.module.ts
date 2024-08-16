import { Module } from '@nestjs/common';
import { CellsController } from 'src/modules/cells/controller/cells.controller';
import { CellsService } from 'src/modules/cells/services/cells.services';
import { LoggerService } from 'src/shared/modules/logger/services/logger.service';
import { PrismaService } from 'src/shared/modules/prisma/services/prisma.service';
@Module({
  imports: [],
  controllers: [CellsController],
  providers: [CellsService, PrismaService, LoggerService],
  exports: [CellsService],
})
export class CellsModule {}