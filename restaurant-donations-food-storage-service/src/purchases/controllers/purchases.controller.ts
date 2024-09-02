import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { appConstants } from 'src/utils/constants';
import { PurchasesService } from '../services/purchases.service';
import { PaginationDTO } from '../dto/pagination.dto';

@ApiTags(appConstants.SWAGGER_PURCHASES_MODULE)
@Controller('purchases')
export class PurchasesController {
  constructor(private purchasesService: PurchasesService) {}

  @Get()
  @HttpCode(200)
  async getPurchases(@Query() pagination: PaginationDTO) {
    return await this.purchasesService.getPurchases(pagination.offset);
  }
}
