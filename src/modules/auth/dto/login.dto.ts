import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ValidatorMessagesHelper } from 'src/shared/helpers/validator-messages-helper';

export class LoginDto {
  @IsEmail({}, { message: ValidatorMessagesHelper.invalid('E-mail') })
  @ApiProperty()
  @IsNotEmpty({ message: ValidatorMessagesHelper.required('E-mail') })
  email: string;

  @IsString({ message: ValidatorMessagesHelper.invalid('password') })
  @ApiProperty()
  @IsNotEmpty({ message: ValidatorMessagesHelper.required('password') })
  password: string;
}