import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from '../providers/orders.providers';

type Message = {
  name: string;
  ingredients: { name: string; quantity: number }[];
};

@Controller()
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @MessagePattern('new-order')
  async handleNewOrder(@Payload() message: Message) {
    const { ingredients } = message;
    await this.ordersService.getIngredients(ingredients);
    return { status: 'processed' };
  }
}
