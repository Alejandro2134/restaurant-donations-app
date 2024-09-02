import 'dotenv/config';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './providers/orders.providers';
import { HttpModule } from '@nestjs/axios';
import { ingredientsProviders } from 'src/ingredients/ingredients.provider';
import { purchasesProviders } from 'src/purchases/purchases.provider';

const KAFKA_BROKER = process.env.KAFKA_BROKER || 'localhost:9092';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_CLIENT_FOOD_STORAGE',
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
            groupId: 'orders-consumer-food-storage',
          },
          producer: {},
        },
      },
    ]),
    HttpModule,
  ],
  providers: [OrdersService, ...ingredientsProviders, ...purchasesProviders],
  controllers: [OrdersController],
})
export class OrdersModule {}
