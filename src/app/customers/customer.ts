export interface Customer {
  id?: number;
  fullName: string;
  email: string;
  company?: string;
  createdAt?: string;
  updatedAt?: string;
  invoices?: any[];
  user?: any;
}
