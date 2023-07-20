import { RegexHelper } from '@/helpers/regex.helper';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateTagDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(RegexHelper.uuid)
  owner: string;
}
