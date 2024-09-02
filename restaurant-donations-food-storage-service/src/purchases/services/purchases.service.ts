import { Inject } from '@nestjs/common';
import { Purchases } from '../models/purchases.model';
import { PurchasesDTO } from '../dto/purchases.dto';

export class PurchasesService {
  constructor(
    @Inject('PURCHASES_REPOSITORY') private purchasesRepo: typeof Purchases,
  ) {}

  async getPurchases(offset: number) {
    const { rows } = await this.purchasesRepo.findAndCountAll({
      order: [['createdAt', 'DESC']],
      offset,
      limit: 10,
    });

    return rows.map(this.fromModelToDTO);
  }

  fromModelToDTO(purchase: Purchases): PurchasesDTO {
    return {
      name: purchase.name,
      amount: purchase.amount,
    };
  }
}
