//* COMPONENTS INTERFACE
export interface ProductInventory {
  id: number;
  img: any;
  productName: string;
  category: string;
  variants: number;
  stock: number;
  totalSells: number;
  totalDisc: number;
  totalReturn: number;
}

//* DATA TABLE COLUMNS INTERFACE
export interface ProductType {
  productId: number;
  img: any;
  productName: string;
  retail: number;
  discPrice: number;
  sells: number;
  returnProduct: number;
  stocks: number;
  supplier: string;
}

export interface UsersType {
  id: number;
  img: null;
  customerName: string;
  email: string;
  role: string;
  status: string;
  totalReturn: number;
}

export type TransactionType = {
  transactId: number;
  img: any;
  customerId: string;
  date: string;
  time: string;
  amount: number;
  status: string;
};

export type CustomerOrderType = {
  id: number;
  orderId: number;
  img: null;
  customerName: string;
  datePlaced: string;
  paymentMethod: string;
  orderStatus: string;
  totalAmount: number;
};
