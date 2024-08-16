import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { CustomerCreateDto } from 'src/modules/customer/dto/customer.create.dto';
import { CustomerService } from 'src/modules/customer/services/customer.services';
import { Auth } from 'src/shared/decorators/auth.decorator';

@Controller('customer')
export class CustomerController {
  constructor(private readonly _customerService: CustomerService) {}

  @ApiOperation({ summary: 'Create new blog' })
  @Auth()
  @Post()
  @UseInterceptors(FileInterceptor('urlimage'))
  async create(@Body() data: CustomerCreateDto) {
    return await this._customerService.create(data);
  }

  @ApiOperation({ summary: 'List all incorporators Barber' })
  @Get()
  async findAll() {
    return await this._customerService.findAll();
  }

  @ApiOperation({ summary: 'List all incorporators Barber' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this._customerService.findOne(id);
  }

  @ApiOperation({ summary: 'List all incorporators Barber' })
  @Get('by-phone/:phone')
  async findByPhone(@Param('phone') phone: string) {
    console.log('userphone');
    return await this._customerService.findByPhone(phone);
  }
}
