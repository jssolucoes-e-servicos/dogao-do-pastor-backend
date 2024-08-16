import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { SellersCreateDto } from 'src/modules/sellers/dto/sellers.create.dto';
import { SellersService } from 'src/modules/sellers/services/sellers.services';
import { Auth } from 'src/shared/decorators/auth.decorator';

@Controller('sellers')
export class SellersController {
  constructor(private readonly _sellersService: SellersService) {}

  @ApiOperation({ summary: 'Create new blog' })
  @Auth()
  @Post()
  @UseInterceptors(FileInterceptor('urlimage'))
  async create(@Body() data: SellersCreateDto) {
    return await this._sellersService.create(data);
  }

  @ApiOperation({ summary: 'List all incorporators Barber' })
  @Get()
  async findAll() {
    return await this._sellersService.findAll();
  }
}
