import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { appConstants } from 'src/utils/constants';
import { OrdersService } from '../services/orders.service';
import { OrdersDTO } from '../dto/orders.dto';

type Message = {
  name: string;
  ingredients: { name: string; quantity: number }[];
  order_id: string;
};

@ApiTags(appConstants.SWAGGER_ORDERS_MODULE)
@Controller('orders')
export class OrdersController {
  constructor(
    @Inject('ORDERS_CLIENT_KITCHEN') private readonly ordersClient: ClientKafka,
    private ordersService: OrdersService,
  ) {}

  @Post()
  @HttpCode(204)
  async createOrder(@Body() ordersAmount: OrdersDTO) {
    for (let i = 0; i < ordersAmount.amount; i++) {
      const orderId = crypto.randomUUID();
      const selectedRecipe = this.ordersService.newOrder();
      this.ordersClient.emit('new-order', {
        value: { ...selectedRecipe, order_id: orderId },
      });
    }
  }

  @MessagePattern('ingredients-ready')
  async handleIngredientsReady(@Payload() message: Message) {
    setTimeout(() => {
      this.ordersClient.emit('order-ready', {
        value: { ...message },
      });

      console.log('Order delivered');
    }, 5000);
  }
}
