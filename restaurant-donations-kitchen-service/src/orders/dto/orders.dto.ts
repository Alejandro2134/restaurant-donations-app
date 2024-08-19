import { ApiProperty } from '@nestjs/swagger';

interface IOrdersDTO {
  amount: number;
}

export class OrdersDTO implements IOrdersDTO {
  @ApiProperty({ default: 1, minimum: 1, maximum: 1000 })
  amount: number;

  constructor(data: IOrdersDTO) {
    this.amount = data.amount;
  }
}
