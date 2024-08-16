import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { OrderItemsService } from 'src/modules/order-items/services/order-items.services';
import { OrderCreateDto } from 'src/modules/order/dto/order.create.dto';
import { Auth } from 'src/shared/decorators/auth.decorator';

@Controller('orders-items')
export class OrderItemsController {
  constructor(private readonly _orderItemsService: OrderItemsService) {}

  @ApiOperation({ summary: 'Create new blog' })
  @Auth()
  @Post()
  async create(@Body() data: OrderCreateDto) {
    return await this._orderItemsService.create(data);
  }

  @ApiOperation({ summary: 'List all incorporators Barber' })
  @Auth()
  @Get(':orderId')
  async findAll(@Param('orderId') orderId: string) {
    return await this._orderItemsService.findAll(orderId);
  }
}
