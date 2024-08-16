import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { CellsCreateDto } from '../dto/cells.create.dto';
import { CellsService } from '../services/cells.services';

@Controller('cells')
export class CellsController {
  constructor(private readonly _cellsService: CellsService) {}

  @ApiOperation({ summary: 'Create new blog' })
  @Auth()
  @Post()
  @UseInterceptors(FileInterceptor('urlimage'))
  async create(@Body() data: CellsCreateDto) {
    return await this._cellsService.create(data);
  }

  @ApiOperation({ summary: 'List all incorporators Barber' })
  @Get()
  async findAll() {
    return await this._cellsService.findAll();
  }
}
