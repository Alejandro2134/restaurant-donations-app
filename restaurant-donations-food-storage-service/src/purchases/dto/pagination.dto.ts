import { ApiProperty } from '@nestjs/swagger';

export type IPaginationDTO = {
  offset: number;
};

export class PaginationDTO implements IPaginationDTO {
  @ApiProperty({ default: 0, minimum: 0, required: false })
  offset: number;

  constructor(data: IPaginationDTO) {
    this.offset = data.offset;
  }
}
