import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EventsGateway } from 'src/events/events.gateway';

type Message = {
  name: string;
  ingredients: { name: string; quantity: number }[];
  order_id: string;
};

@Controller()
export class OrdersController {
  constructor(private readonly eventHandler: EventsGateway) {}

  @MessagePattern('new-order')
  handleNewOrder(@Payload() message: Message) {
    console.log('New order received', message);
    this.eventHandler.server.emit('order:new', message);
  }

  @MessagePattern('order-ready')
  handleOrderReady(@Payload() message: Message) {
    console.log('Order ready', message);
    this.eventHandler.server.emit('order:ready', message);
  }
}
