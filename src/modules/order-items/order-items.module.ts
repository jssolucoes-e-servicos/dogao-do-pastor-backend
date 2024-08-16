import { Module } from '@nestjs/common';
import { OrderItemsController } from 'src/modules/order-items/controller/order-items.controller';
import { OrderItemsService } from 'src/modules/order-items/services/order-items.services';
import { LoggerService } from 'src/shared/modules/logger/services/logger.service';
import { PrismaService } from 'src/shared/modules/prisma/services/prisma.service';
@Module({
  imports: [],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, PrismaService, LoggerService],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}
