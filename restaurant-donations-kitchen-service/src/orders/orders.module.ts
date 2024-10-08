import 'dotenv/config';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';

const KAFKA_BROKER = process.env.KAFKA_BROKER || 'localhost:9092';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_CLIENT_KITCHEN',
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
          producer: {},
          consumer: {
            groupId: 'orders-consumer-kitchen-service',
          },
        },
      },
    ]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
