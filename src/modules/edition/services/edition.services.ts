import { Injectable } from '@nestjs/common';
import { EditionCreateDto } from 'src/modules/edition/dto/edition.create.dto';
import { ResponseResultsHelper } from 'src/shared/helpers/response-results.helper';
import { LoggerService } from 'src/shared/modules/logger/services/logger.service';
import { PrismaService } from 'src/shared/modules/prisma/services/prisma.service';

@Injectable()
export class EditionService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _logger: LoggerService,
  ) {}
  private readonly _name: string = 'Cells';

  async create(data: EditionCreateDto) {
    try {
      const dataExists = await this._prisma.edition.findFirst({
        where: { name: data.name },
      });
      if (dataExists) {
        ResponseResultsHelper.RegisterAlreadyExists(this._name);
      }

      const seller = await this._prisma.edition.create({
        data: {
          name: data.name,
          limit: data.limit,
          sold: data.sold,
          price: data.price,
          startOfSales: data.startOfSales,
          date: data.date,
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
      const sellers = await this._prisma.edition.findMany();
      return sellers;
    } catch (error) {
      this._logger.setError(this._name, error);
      return ResponseResultsHelper.ErrorResult();
    }
  }
}
