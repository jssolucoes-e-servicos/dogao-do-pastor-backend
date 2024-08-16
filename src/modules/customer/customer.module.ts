import { Module } from '@nestjs/common';
import { CustomerController } from 'src/modules/customer/controller/customer.controller';
import { CustomerService } from 'src/modules/customer/services/customer.services';
import { SellersModule } from 'src/modules/sellers/sellers.module';
import { UsersModule } from 'src/modules/users/users.module';
import { LoggerService } from 'src/shared/modules/logger/services/logger.service';
import { PrismaService } from 'src/shared/modules/prisma/services/prisma.service';

@Module({
  imports: [UsersModule, SellersModule],
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService, LoggerService],
  exports: [CustomerService],
})
export class CustomerModule {}
