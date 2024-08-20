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
            sasl: {
              mechanism: 'plain',
              username: process.env.KAFKA_USERNAME,
              password: process.env.KAFKA_PASSWORD,
            },
            ssl: true,
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
