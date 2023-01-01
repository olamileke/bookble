import { ApiProperty } from '@nestjs/swagger';

export class Pagination {
  @ApiProperty({ type: Number, example: '1' })
  currentPage: number;

  @ApiProperty({ type: Number, example: '5' })
  maxPages: number;
}

export class ApiCommonResponse {
  @ApiProperty()
  message: string;
}
