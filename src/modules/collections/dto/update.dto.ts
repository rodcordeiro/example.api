import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateCollectionDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
