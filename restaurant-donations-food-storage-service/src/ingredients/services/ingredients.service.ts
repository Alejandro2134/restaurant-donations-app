import { Inject, Injectable } from '@nestjs/common';
import { Ingredient } from '../models/ingredient.model';
import { IngredientDTO } from '../dto/ingredient.dto';

@Injectable()
export class IngredientsService {
  constructor(
    @Inject('INGREDIENT_REPOSITORY') private ingredientsRepo: typeof Ingredient,
  ) {}

  async getIngredients(): Promise<IngredientDTO> {
    const ingredients = await this.ingredientsRepo.findByPk(1);
    return this.fromModelToDTO(ingredients);
  }

  fromModelToDTO(ingredient: Ingredient): IngredientDTO {
    return {
      tomato: ingredient.tomato,
      lemon: ingredient.lemon,
      potato: ingredient.potato,
      rice: ingredient.rice,
      ketchup: ingredient.ketchup,
      lettuce: ingredient.lettuce,
      onion: ingredient.onion,
      cheese: ingredient.cheese,
      meat: ingredient.meat,
      chicken: ingredient.chicken,
    };
  }
}
