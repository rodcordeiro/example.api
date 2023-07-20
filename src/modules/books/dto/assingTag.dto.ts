import { RegexHelper } from '@/helpers/regex.helper';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class AssignTagDTO {
  @ApiProperty()
  @Matches(RegexHelper.uuid, { each: true })
  @IsNotEmpty()
  tags: string[];
}
