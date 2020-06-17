import { Customer } from '../customers/customer';

export interface Invoice {
  id?: number;
  chrono?: number;
  amount: number;
  createdAt?: string;
  apdatedAt?: string;
  title: string;
  customer: Customer | string;
}
