import {
  Body,
  Controller,
  HttpCode,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { appConstants } from 'src/utils/constants';
import { OrdersService } from '../services/orders.service';
import { lastValueFrom } from 'rxjs';
import { OrdersDTO } from '../dto/orders.dto';

@ApiTags(appConstants.SWAGGER_ORDERS_MODULE)
@Controller('orders')
export class OrdersController implements OnModuleInit {
  constructor(
    @Inject('ORDERS_CLIENT_KITCHEN') private readonly ordersClient: ClientKafka,
    private ordersService: OrdersService,
  ) {}

  onModuleInit() {
    this.ordersClient.subscribeToResponseOf('new-order');
  }

  @Post()
  @HttpCode(204)
  async createOrder(@Body() ordersAmount: OrdersDTO) {
    for (let i = 0; i < ordersAmount.amount; i++) {
      const orderId = crypto.randomUUID();
      const selectedRecipe = this.ordersService.newOrder();
      const message = this.ordersClient.send('new-order', {
        value: { ...selectedRecipe, order_id: orderId },
      });
      await lastValueFrom(message);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      this.ordersClient.emit('order-ready', {
        value: { ...selectedRecipe, order_id: orderId },
      });
    }
  }
}
