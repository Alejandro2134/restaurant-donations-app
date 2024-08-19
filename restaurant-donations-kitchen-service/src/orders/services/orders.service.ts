import { Injectable } from '@nestjs/common';
import { appConstants } from 'src/utils/constants';

@Injectable()
export class OrdersService {
  newOrder() {
    const availableRecipes = appConstants.AVAILABLE_RECIPES.length;

    return appConstants.AVAILABLE_RECIPES[
      Math.floor(Math.random() * availableRecipes)
    ];
  }
}
