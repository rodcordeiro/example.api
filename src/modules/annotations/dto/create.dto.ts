import { RegexHelper } from '@/helpers/regex.helper';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateAnnotationDTO {
  @ApiProperty()
  @IsNotEmpty()
  annotation: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(RegexHelper.uuid)
  owner: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(RegexHelper.uuid)
  book: string;
}
