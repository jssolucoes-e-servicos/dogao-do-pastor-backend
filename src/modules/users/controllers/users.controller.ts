import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UsersCreateDto } from 'src/modules/users/dto/users.create.dto';
import { UsersUpdateDto } from 'src/modules/users/dto/users.update.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { Auth } from 'src/shared/decorators/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @ApiOperation({ summary: 'Create new user' })
  @Auth()
  @Post()
  async create(@Body() data: UsersCreateDto) {
    return await this._usersService.create(data);
  }

  @Auth()
  @ApiOperation({ summary: 'List all user' })
  @Get()
  async findAll() {
    return await this._usersService.findAll();
  }

  @Auth()
  @ApiOperation({ summary: 'List user by ID' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this._usersService.findOne(id);
  }

  @Auth()
  @ApiOperation({ summary: 'Change user by ID' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UsersUpdateDto) {
    return await this._usersService.update(id, data);
  }

  @Auth()
  @ApiOperation({ summary: 'Delete user by ID' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this._usersService.remove(id);
  }
}
