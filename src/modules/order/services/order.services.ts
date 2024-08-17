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
  private readonly _editionId: string = '66bfeca2a07eea332713e6d6';

  async create(data: OrderCreateDto) {
    try {
      let seller = await this._prisma.seller.findFirst({
        where: { phone: data.seller.phone },
      });
      if (!seller) {
        seller = await this._prisma.seller.create({
          data: {
            name: data.seller.name,
            phone: data.seller.phone,
            cellId: data.cell.id,
          },
        });
      }
      let customer = await this._prisma.customer.findFirst({
        where: { phone: data.customer.phone, sellerId: seller.id },
      });
      if (!customer) {
        customer = await this._prisma.customer.create({
          data: {
            name: data.customer.name,
            phone: data.customer.phone,
            sellerId: seller.id,
            address: data.customer.address,
            reference: data.customer.reference,
          },
        });
      }

      const order = await this._prisma.order.create({
        data: {
          hour: data.order.hour,
          editionId: this._editionId,
          cellId: data.cell.id,
          ticket: '',
          customerId: customer.id,
          amount: data.order.amount,
          sellerId: seller.id,
          status: 'FILA',
          observation: data.order.observation,
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

  async findbySellerPhone(sellerPhone: string) {
    try {
      const order = await this._prisma.order.findMany({
        where: {
          seller: {
            phone: sellerPhone,
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

  async findbyCell(cellId: string) {
    try {
      const order = await this._prisma.order.findMany({
        where: {
          cell: {
            id: cellId,
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
