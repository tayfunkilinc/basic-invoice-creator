export interface InvoiceItem {
  id: string;
  quantity: number;
  description: string;
  unitPrice: number;
  amount: number;
}

export interface InvoiceData {
  companyName: string;
  companyAddress: string;
  invoiceNumber: string;
  invoiceDate: string;
  poNumber: string;
  dueDate: string;
  billTo: string;
  shipTo: string;
  items: InvoiceItem[];
  taxRate: number;
  subtotal: number;
  taxAmount: number;
  total: number;
  termsAndConditions: string;
}
