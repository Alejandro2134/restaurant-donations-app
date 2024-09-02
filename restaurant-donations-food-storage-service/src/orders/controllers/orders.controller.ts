import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from '../providers/orders.providers';

type Message = {
  name: string;
  ingredients: { name: string; quantity: number }[];
  order_id: string;
};

@Controller()
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    @Inject('ORDERS_CLIENT_FOOD_STORAGE')
    private readonly ordersClient: ClientKafka,
  ) {}

  @MessagePattern('new-order')
  async handleNewOrder(@Payload() message: Message) {
    const { ingredients } = message;
    await this.ordersService.getIngredients(ingredients);
    this.ordersClient.emit('ingredients-ready', { ...message });
  }
}
