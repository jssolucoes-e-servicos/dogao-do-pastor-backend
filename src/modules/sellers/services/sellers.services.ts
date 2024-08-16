import { Injectable } from '@nestjs/common';
import { ResponseResultsHelper } from 'src/shared/helpers/response-results.helper';
import { LoggerService } from 'src/shared/modules/logger/services/logger.service';
import { PrismaService } from 'src/shared/modules/prisma/services/prisma.service';
import { SellersCreateDto } from '../dto/sellers.create.dto';

@Injectable()
export class SellersService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _logger: LoggerService,
  ) {}
  private readonly _name: string = 'Cells';

  async create(data: SellersCreateDto) {
    try {
      const dataExists = await this._prisma.seller.findFirst({
        where: { name: data.phone },
      });
      if (dataExists) {
        ResponseResultsHelper.RegisterAlreadyExists(this._name);
      }

      const seller = await this._prisma.seller.create({
        data: {
          name: data.name,
          phone: data.phone,
          cellId: data.cellId,
        },
      });

      return seller;
    } catch (error) {
      this._logger.setError(this._name, error);
      ResponseResultsHelper.ErrorResult();
    }
  }

  async findAll() {
    try {
      const sellers = await this._prisma.seller.findMany();
      return sellers;
    } catch (error) {
      this._logger.setError(this._name, error);
      return ResponseResultsHelper.ErrorResult();
    }
  }
}
