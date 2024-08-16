import { Injectable } from '@nestjs/common';
import { OrderItemsCreateDto } from 'src/modules/order-items/dto/order-items.create.dto';
import { ResponseResultsHelper } from 'src/shared/helpers/response-results.helper';
import { LoggerService } from 'src/shared/modules/logger/services/logger.service';
import { PrismaService } from 'src/shared/modules/prisma/services/prisma.service';

@Injectable()
export class OrderItemsService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _logger: LoggerService,
  ) {}
  private readonly _name: string = 'Order_Items';

  async create(data: OrderItemsCreateDto) {
    try {
      const order = await this._prisma.orderItem.create({
        data: {
          orderId: data.orderId,
          amount: data.amount,
          isComplete: data.isComplete,
          potato: data.potato,
          ketchup: data.ketchup,
          peas: data.peas,
          mayonnaise: data.mayonnaise,
          corn: data.corn,
          redSauce: data.redSauce,
          cheeseSauce: data.cheeseSauce,
          mustard: data.mustard,
          bread: data.bread,
          gratedCheese: data.gratedCheese,
          sausage: data.sausage,
        },
      });

      return order;
    } catch (error) {
      this._logger.setError(this._name, error);
      ResponseResultsHelper.ErrorResult();
    }
  }

  async findAll(orderId: string) {
    try {
      const items = await this._prisma.orderItem.findMany({
        where: {
          orderId,
        },
      });
      return items;
    } catch (error) {
      this._logger.setError(this._name, error);
      return ResponseResultsHelper.ErrorResult();
    }
  }

  async findOne(id: string) {
    try {
      const order = await this._prisma.orderItem.findFirst({
        where: { id },
      });
      return order;
    } catch (error) {
      this._logger.setError(this._name, error);
      return ResponseResultsHelper.ErrorResult();
    }
  }
}
