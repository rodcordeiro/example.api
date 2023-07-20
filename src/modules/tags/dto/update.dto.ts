import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateTagDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
