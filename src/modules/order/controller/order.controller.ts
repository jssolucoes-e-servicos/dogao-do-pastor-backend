import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { OrderCreateDto } from 'src/modules/order/dto/order.create.dto';
import { OrderService } from 'src/modules/order/services/order.services';
import { Auth } from 'src/shared/decorators/auth.decorator';

@Controller('orders')
export class OrderController {
  constructor(private readonly _orderService: OrderService) {}

  @ApiOperation({ summary: 'Create new blog' })
  @Auth()
  @Post()
  @UseInterceptors(FileInterceptor('urlimage'))
  async create(@Body() data: OrderCreateDto) {
    return await this._orderService.create(data);
  }

  @ApiOperation({ summary: 'List all incorporators Barber' })
  @Get()
  async findAll() {
    return await this._orderService.findAll();
  }
}
