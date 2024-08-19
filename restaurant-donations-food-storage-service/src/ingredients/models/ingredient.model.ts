import { Table, Model, Column } from 'sequelize-typescript';

@Table({ timestamps: false })
export class Ingredient extends Model {
  @Column
  tomato: number;

  @Column
  lemon: number;

  @Column
  potato: number;

  @Column
  rice: number;

  @Column
  ketchup: number;

  @Column
  lettuce: number;

  @Column
  onion: number;

  @Column
  cheese: number;

  @Column
  meat: number;

  @Column
  chicken: number;
}
