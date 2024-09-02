type IPurchasesDTO = {
  name: string;
  amount: number;
};

export class PurchasesDTO implements IPurchasesDTO {
  name: string;
  amount: number;

  constructor(data: IPurchasesDTO) {
    this.name = data.name;
    this.amount = data.amount;
  }
}
