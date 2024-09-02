import { Module } from '@nestjs/common';
import { PurchasesController } from './controllers/purchases.controller';
import { PurchasesService } from './services/purchases.service';
import { purchasesProviders } from './purchases.provider';

@Module({
  controllers: [PurchasesController],
  providers: [PurchasesService, ...purchasesProviders],
})
export class PurchasesModule {}
