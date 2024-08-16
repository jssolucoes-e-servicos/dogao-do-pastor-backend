import { Injectable } from '@nestjs/common';
import { CustomerCreateDto } from 'src/modules/customer/dto/customer.create.dto';
import { ResponseResultsHelper } from 'src/shared/helpers/response-results.helper';
import { LoggerService } from 'src/shared/modules/logger/services/logger.service';
import { PrismaService } from 'src/shared/modules/prisma/services/prisma.service';

@Injectable()
export class CustomerService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _logger: LoggerService,
  ) {}
  private readonly _name: string = 'Cells';

  async create(data: CustomerCreateDto) {
    try {
      const dataExists = await this._prisma.customer.findFirst({
        where: { name: data.phone },
      });
      if (dataExists) {
        ResponseResultsHelper.RegisterAlreadyExists(this._name);
      }

      const customer = await this._prisma.customer.create({
        data: {
          name: data.name,
          phone: data.phone,
          address: data.address,
          reference: data.reference,
          sellerId: data.sellerId,
          userId: data.userId,
        },
      });

      return customer;
    } catch (error) {
      this._logger.setError(this._name, error);
      ResponseResultsHelper.ErrorResult();
    }
  }

  async findAll() {
    try {
      const customer = this._prisma.customer.findMany();
      return customer;
    } catch (error) {
      this._logger.setError(this._name, error);
      return ResponseResultsHelper.ErrorResult();
    }
  }

  async findOne(id: string) {
    try {
      const customer = this._prisma.customer.findFirst({ where: { id } });
      return customer;
    } catch (error) {
      this._logger.setError(this._name, error);
      return ResponseResultsHelper.ErrorResult();
    }
  }

  async findByPhone(phone: string) {
    try {
      const customer = this._prisma.customer.findFirst({ where: { phone } });
      return customer;
    } catch (error) {
      this._logger.setError(this._name, error);
      return ResponseResultsHelper.ErrorResult();
    }
  }
}
