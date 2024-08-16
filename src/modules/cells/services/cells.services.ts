import { Injectable } from '@nestjs/common';
import { ResponseResultsHelper } from 'src/shared/helpers/response-results.helper';
import { LoggerService } from 'src/shared/modules/logger/services/logger.service';
import { PrismaService } from 'src/shared/modules/prisma/services/prisma.service';
import { CellsCreateDto } from '../dto/cells.create.dto';

@Injectable()
export class CellsService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _logger: LoggerService,
  ) {}
  private readonly _name: string = 'Cells';

  async create(data: CellsCreateDto) {
    try {
      const dataExists = await this._prisma.cell.findFirst({
        where: { name: data.name },
      });
      if (dataExists) {
        ResponseResultsHelper.RegisterAlreadyExists(this._name);
      }

      const cell = await this._prisma.cell.create({
        data: {
          name: data.name,
          leaderName: data.leaderName,
        },
      });

      return cell;
    } catch (error) {
      this._logger.setError(this._name, error);
      ResponseResultsHelper.ErrorResult();
    }
  }

  async findAll() {
    try {
      const cells = this._prisma.cell.findMany();
      return cells;
    } catch (error) {
      this._logger.setError(this._name, error);
      return ResponseResultsHelper.ErrorResult();
    }
  }
}
