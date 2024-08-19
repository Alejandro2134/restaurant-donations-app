import 'dotenv/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { EventsGateway } from 'src/events/events.gateway';

const KAFKA_BROKER = process.env.KAFKA_BROKER || 'localhost:9092';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_CLIENT_CONSUMER',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [KAFKA_BROKER],
          },
          consumer: {
            groupId: 'orders-consumer',
          },
        },
      },
    ]),
  ],
  providers: [EventsGateway],
  controllers: [OrdersController],
})
export class OrdersModule {}
