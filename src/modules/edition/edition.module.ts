import { Module } from '@nestjs/common';
import { EditionController } from 'src/modules/edition/controller/edition.controller';
import { EditionService } from 'src/modules/edition/services/edition.services';
import { LoggerService } from 'src/shared/modules/logger/services/logger.service';
import { PrismaService } from 'src/shared/modules/prisma/services/prisma.service';

@Module({
  imports: [],
  controllers: [EditionController],
  providers: [EditionService, PrismaService, LoggerService],
  exports: [EditionService],
})
export class EditionModule {}
