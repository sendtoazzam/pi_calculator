import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryParamDTO } from 'src/common/query-params/base-dto.queryparam';

export class PiQueryDTO extends BaseQueryParamDTO {
  @ApiProperty({ required: false })
  id: string;

  @ApiProperty({ required: false })
  createdBy: number;
}
