import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ValidatorMessagesHelper } from 'src/shared/helpers/validator-messages-helper';
import { UsersCreateDto } from 'src/modules/users/dto/users.create.dto';

export class UsersUpdateDto extends PartialType(UsersCreateDto) {
  @IsString({ message: ValidatorMessagesHelper.invalid('Id') })
  @ApiProperty()
  @IsNotEmpty({ message: ValidatorMessagesHelper.required('Id') })
  id: string;
}
