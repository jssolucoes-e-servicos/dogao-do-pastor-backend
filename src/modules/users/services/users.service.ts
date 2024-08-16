import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UsersCreateDto } from 'src/modules/users/dto/users.create.dto';
import { UsersUpdateDto } from 'src/modules/users/dto/users.update.dto';
import { ResponseResultsHelper } from 'src/shared/helpers/response-results.helper';
import { LoggerService } from 'src/shared/modules/logger/services/logger.service';
import { PrismaService } from 'src/shared/modules/prisma/services/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _logger: LoggerService,
  ) {}
  private readonly _name: string = 'Users';

  async create(data: UsersCreateDto) {
    try {
      const dataExists = await this._prisma.user.findFirst({
        where: {
          username: data.username,
        },
      });
      if (dataExists) {
        ResponseResultsHelper.RegisterAlreadyExists(this._name);
      }
      const dataToInsert: UsersCreateDto = {
        ...data,
        password: await hash(data.password, 10),
      };
      const user = await this._prisma.user.create({
        data: dataToInsert,
      });

      return {
        ...user,
        password: undefined,
      };
    } catch (error) {
      this._logger.setError(this._name, error);
      ResponseResultsHelper.ErrorResult();
    }
  }

  async findAll() {
    try {
      const users = await this._prisma.user.findMany();
      return users;
    } catch (error) {
      this._logger.setError(this._name, error);
      return null;
    }
  }

  async findOne(id: string) {
    try {
      return await this._prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this._logger.setError(this._name, error);
      ResponseResultsHelper.ErrorResult();
    }
  }

  async findUserByUsernameToLogin(username: string) {
    try {
      const user = await this._prisma.user.findFirst({
        where: { username },
      });

      return user;
    } catch (error) {
      this._logger.setError(this._name, error);
      ResponseResultsHelper.ErrorResult();
    }
  }

  async update(id: string, data: UsersUpdateDto) {
    try {
      const dataExists = await this._prisma.user.findFirst({
        where: {
          id: id,
        },
      });
      if (!dataExists) ResponseResultsHelper.RegisterNotExists(this._name);
      return await this._prisma.user.update({
        data,
        where: {
          id,
        },
      });
    } catch (error) {
      this._logger.setError(this._name, error);
      ResponseResultsHelper.ErrorResult();
    }
  }

  async remove(id: string) {
    try {
      const dataExists = await this._prisma.user.findUnique({
        where: { id },
      });

      if (!dataExists) ResponseResultsHelper.RegisterNotExists(this._name);
      await this._prisma.user.delete({
        where: { id },
      });

      return ResponseResultsHelper.RegisterDeleted();
    } catch (error) {
      this._logger.setError(this._name, error);
      ResponseResultsHelper.ErrorResult();
    }
  }
}
