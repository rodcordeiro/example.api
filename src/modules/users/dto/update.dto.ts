import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
export class UpdateUserDTO {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  @IsEmail()
  email: string;
}
