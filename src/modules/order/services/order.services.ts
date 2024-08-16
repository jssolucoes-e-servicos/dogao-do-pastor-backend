import { Injectable } from '@nestjs/common';
import { OrderCreateDto } from 'src/modules/order/dto/order.create.dto';
import { ResponseResultsHelper } from 'src/shared/helpers/response-results.helper';
import { LoggerService } from 'src/shared/modules/logger/services/logger.service';
import { PrismaService } from 'src/shared/modules/prisma/services/prisma.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _logger: LoggerService,
  ) {}
  private readonly _name: string = 'Orders';

  async create(data: OrderCreateDto) {
    try {
      const order = await this._prisma.order.create({
        data: {
          hour: data.hour,
          editionId: data.editionId,
          cellId: data.cellId,
          ticket: data.ticket,
          customerId: data.customerId,
          amount: data.amount,
          sellerId: data.sellerId,
          status: data.status,
          observation: data.observation,
        },
      });

      return order;
    } catch (error) {
      this._logger.setError(this._name, error);
      ResponseResultsHelper.ErrorResult();
    }
  }

  async findAll() {
    try {
      const cells = await this._prisma.cell.findMany();
      return cells;
    } catch (error) {
      this._logger.setError(this._name, error);
      return ResponseResultsHelper.ErrorResult();
    }
  }

  async findOne(id: string) {
    try {
      const order = await this._prisma.order.findFirst({
        where: { id },
        include: {
          OrderItem: true,
          cell: true,
          customer: true,
          seller: true,
        },
      });
      return order;
    } catch (error) {
      this._logger.setError(this._name, error);
      return ResponseResultsHelper.ErrorResult();
    }
  }

  async findbyCustomerPhone(phone: string) {
    try {
      const order = await this._prisma.order.findMany({
        where: {
          customer: {
            phone: phone,
          },
        },
        include: {
          OrderItem: true,
          cell: true,
          customer: true,
          seller: true,
        },
      });
      return order;
    } catch (error) {
      this._logger.setError(this._name, error);
      return ResponseResultsHelper.ErrorResult();
    }
  }

  async findbyCustomerId(customerId: string) {
    try {
      const order = await this._prisma.order.findMany({
        where: {
          customer: {
            id: customerId,
          },
        },
        include: {
          OrderItem: true,
          cell: true,
          customer: true,
          seller: true,
        },
      });
      return order;
    } catch (error) {
      this._logger.setError(this._name, error);
      return ResponseResultsHelper.ErrorResult();
    }
  }

  async findbySellerId(sellerId: string) {
    try {
      const order = await this._prisma.order.findMany({
        where: {
          seller: {
            id: sellerId,
          },
        },
        include: {
          OrderItem: true,
          cell: true,
          customer: true,
          seller: true,
        },
      });
      return order;
    } catch (error) {
      this._logger.setError(this._name, error);
      return ResponseResultsHelper.ErrorResult();
    }
  }
}
