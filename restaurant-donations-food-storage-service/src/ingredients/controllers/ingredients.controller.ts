import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { appConstants } from 'src/utils/constants';
import { IngredientsService } from '../services/ingredients.service';

@ApiTags(appConstants.SWAGGER_INGREDIENTS_MODULE)
@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}

  @Get()
  @HttpCode(200)
  async getIngredients() {
    return await this.ingredientsService.getIngredients();
  }
}
