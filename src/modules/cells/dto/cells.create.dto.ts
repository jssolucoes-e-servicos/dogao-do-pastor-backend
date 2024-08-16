import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CellsCreateDto {
  @ApiProperty()
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(5, { message: 'O nome deve ter no mínimo 5 caracteres.' })
  name: string;

  @ApiProperty()
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(5, { message: 'O nome deve ter no mínimo 5 caracteres.' })
  leaderName: string;
}
