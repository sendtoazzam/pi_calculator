import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export abstract class BaseQueryParamDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  id: string;

  @ApiProperty({ required: false })
  @IsOptional()
  page: number = 1;

  @ApiProperty({ required: false })
  @IsOptional()
  limit: number = 30;

  @ApiProperty({ required: false })
  @IsOptional()
  orderBy: string = '-id';

  @ApiProperty({ required: false })
  @IsOptional()
  fields: string;

  @ApiProperty({ required: false })
  @IsOptional()
  from: string;

  @ApiProperty({ required: false })
  @IsOptional()
  to: string;

  @ApiProperty({ required: false })
  @IsOptional()
  paginationMeta: string;
}
