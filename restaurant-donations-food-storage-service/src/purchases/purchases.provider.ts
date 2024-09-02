import { Purchases } from './models/purchases.model';

export const purchasesProviders = [
  {
    provide: 'PURCHASES_REPOSITORY',
    useValue: Purchases,
  },
];
