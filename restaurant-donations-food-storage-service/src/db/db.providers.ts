import { Sequelize } from 'sequelize-typescript';
import { Ingredient } from 'src/ingredients/models/ingredient.model';
import { Purchases } from 'src/purchases/models/purchases.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST_NAME || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME || 'user',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'db',
        dialectOptions: {
          ssl: {
            require: true,
          },
        },
      });
      sequelize.addModels([Ingredient, Purchases]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
