import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Ingredient } from 'src/ingredients/models/ingredient.model';
import { Purchases } from 'src/purchases/models/purchases.model';

type Ingredients = {
  name: string;
  quantity: number;
};

type FoodMarketplaceResponse = { quantitySold: number };

const FOOD_MARKETPLACE_URL = process.env.FOOD_MARKETPLACE_URL || '';

@Injectable()
export class OrdersService implements OnApplicationBootstrap {
  constructor(
    private readonly httpService: HttpService,
    @Inject('INGREDIENT_REPOSITORY')
    private ingredientsRepo: typeof Ingredient,
    @Inject('PURCHASES_REPOSITORY') private purchasesRepo: typeof Purchases,
  ) {}

  async onApplicationBootstrap() {
    const ingredients = await this.ingredientsRepo.findAll();
    if (ingredients.length === 0) {
      await this.ingredientsRepo.create({
        tomato: 5,
        lemon: 5,
        potato: 5,
        rice: 5,
        ketchup: 5,
        lettuce: 5,
        onion: 5,
        cheese: 5,
        meat: 5,
        chicken: 5,
      });
    }
  }

  async getIngredients(ingredients: Ingredients[]) {
    const availableIngredients = await this.ingredientsRepo.findByPk(1);

    for (const ingredient of ingredients) {
      if (availableIngredients[ingredient.name] < ingredient.quantity) {
        let ingredientPurchased = 0;

        do {
          const { data } = await firstValueFrom(
            this.httpService.get<FoodMarketplaceResponse>(
              `${FOOD_MARKETPLACE_URL}?ingredient=${ingredient.name}`,
            ),
          );

          if (data.quantitySold !== 0) {
            await this.purchasesRepo.create({
              name: ingredient.name,
              amount: data.quantitySold,
            });
          }

          ingredientPurchased = data.quantitySold;
          availableIngredients[ingredient.name] += ingredientPurchased;
        } while (
          ingredientPurchased !== 0 &&
          availableIngredients[ingredient.name] < ingredient.quantity
        );
      } else {
        availableIngredients[ingredient.name] -= ingredient.quantity;
      }
    }

    await availableIngredients.save();
  }
}
