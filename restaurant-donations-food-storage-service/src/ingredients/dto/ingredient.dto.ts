type IIngredientDTO = {
  tomato: number;
  lemon: number;
  potato: number;
  rice: number;
  ketchup: number;
  lettuce: number;
  onion: number;
  cheese: number;
  meat: number;
  chicken: number;
};

export class IngredientDTO implements IIngredientDTO {
  tomato: number;
  lemon: number;
  potato: number;
  rice: number;
  ketchup: number;
  lettuce: number;
  onion: number;
  cheese: number;
  meat: number;
  chicken: number;

  constructor(data: IIngredientDTO) {
    this.tomato = data.tomato;
    this.lemon = data.lemon;
    this.potato = data.potato;
    this.rice = data.rice;
    this.ketchup = data.ketchup;
    this.lettuce = data.lettuce;
    this.onion = data.onion;
    this.cheese = data.cheese;
    this.meat = data.meat;
    this.chicken = data.chicken;
  }
}
