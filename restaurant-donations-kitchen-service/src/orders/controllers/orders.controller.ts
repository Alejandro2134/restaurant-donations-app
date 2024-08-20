import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { appConstants } from 'src/utils/constants';
import { OrdersService } from '../services/orders.service';
import { OrdersDTO } from '../dto/orders.dto';

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
      await new Promise((resolve) => setTimeout(resolve, 5000));
      this.ordersClient.emit('order-ready', {
        value: { ...selectedRecipe, order_id: orderId },
      });
      console.log('Order delivered');
    }
  }
}
