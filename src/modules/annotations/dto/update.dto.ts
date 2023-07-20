import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateAnnotationDTO {
  @ApiProperty()
  @IsNotEmpty()
  annotation: string;
}
