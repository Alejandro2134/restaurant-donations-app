import { Ingredient } from './models/ingredient.model';

export const ingredientsProviders = [
  {
    provide: 'INGREDIENT_REPOSITORY',
    useValue: Ingredient,
  },
];
