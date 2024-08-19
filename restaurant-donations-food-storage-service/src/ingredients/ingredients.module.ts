import { Module } from '@nestjs/common';
import { IngredientsController } from './controllers/ingredients.controller';
import { ingredientsProviders } from './ingredients.provider';
import { IngredientsService } from './services/ingredients.service';

@Module({
  controllers: [IngredientsController],
  providers: [IngredientsService, ...ingredientsProviders],
})
export class IngredientsModule {}
