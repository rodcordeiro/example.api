import { RegexHelper } from '@/helpers/regex.helper';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, IsNumber, IsOptional } from 'class-validator';

export class CreateBookDTO {
  @ApiProperty({
    description: 'Book name',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  author: string;

  @ApiProperty()
  @IsNotEmpty()
  releaseYear: number;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(RegexHelper.uuid)
  owner: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  collectionOrder?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Matches(RegexHelper.uuid)
  collection?: string;
}
