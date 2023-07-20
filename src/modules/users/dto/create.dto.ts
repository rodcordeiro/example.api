import { IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegexHelper } from '@/helpers/regex.helper';
export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(RegexHelper.password, {
    message:
      'Password must contain lowercase and uppercase letters, numbers, special characters and minimun length of 8.',
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
