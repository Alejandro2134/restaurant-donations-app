import { Column, Model, Table } from 'sequelize-typescript';

@Table({})
export class Purchases extends Model {
  @Column
  name: string;

  @Column
  amount: number;
}
