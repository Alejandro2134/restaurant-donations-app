import 'dotenv/config';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './providers/orders.providers';
import { HttpModule } from '@nestjs/axios';
import { ingredientsProviders } from 'src/ingredients/ingredients.provider';

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
          },
          consumer: {
            groupId: 'orders-consumer-food-storage',
          },
        },
      },
    ]),
    HttpModule,
  ],
  providers: [OrdersService, ...ingredientsProviders],
  controllers: [OrdersController],
})
export class OrdersModule {}
