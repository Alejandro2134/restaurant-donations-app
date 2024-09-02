import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { DatabaseModule } from './db/db.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { PurchasesModule } from './purchases/purchases.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    OrdersModule,
    IngredientsModule,
    PurchasesModule,
  ],
})
export class AppModule {}
