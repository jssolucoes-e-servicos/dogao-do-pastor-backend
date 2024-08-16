import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { EditionCreateDto } from 'src/modules/edition/dto/edition.create.dto';
import { EditionService } from 'src/modules/edition/services/edition.services';
import { Auth } from 'src/shared/decorators/auth.decorator';

@Controller('edition')
export class EditionController {
  constructor(private readonly _editionService: EditionService) {}

  @ApiOperation({ summary: 'Create new blog' })
  @Auth()
  @Post()
  @UseInterceptors(FileInterceptor('urlimage'))
  async create(@Body() data: EditionCreateDto) {
    return await this._editionService.create(data);
  }

  @ApiOperation({ summary: 'List all incorporators Barber' })
  @Get()
  async findAll() {
    return await this._editionService.findAll();
  }
}
