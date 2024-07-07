import React, { ReactNode } from "react";

//* COMPONENTS INTERFACE

export interface ProductInventory {
  id: number;
  img: any;
  name: string;
  category: string;
  variant: number;
  stock: number;
  totalSells: number;
  totalDisc: number;
  totalReturn: number;
}

//* API CONFIG INTERFACE
export interface ApiConfig {
  url: string;
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

export type PackOrderType = {
  id: number;
  orderId: number;
  img: null;
  customerName: string;
  totalOrders: number;
  totalAmount: number;
  datePlaced: string;
  paymentMethod: string;
  status: string;
};

export type ShipmentOrderType = {
  id: number;
  orderId: number;
  img: null;
  customerName: string;
  totalOrders: number;
  totalAmount: number;
  datePlaced: string;
  paymentMethod: string;
  status: string;
};

export type HandOverType = {
  id: number;
  orderId: number;
  img: null;
  customerName: string;
  totalOrders: number;
  totalAmount: number;
  datePlaced: string;
  paymentMethod: string;
  status: string;
};

export type ShippingType = {
  id: number;
  orderId: number;
  img: null;
  customerName: string;
  shippingAddress: string;
  totalItems: number;
  totalAmount: number;
  paymentMethod: string;
  status: string;
};

export type DeliveredType = {
  id: number;
  orderId: number;
  img: null;
  customerName: string;
  shippingAddress: string;
  totalItems: number;
  totalAmount: number;
  paymentMethod: string;
  status: string;
};

export type FailedDeliverType = {
  id: number;
  orderId: number;
  img: null;
  customerName: string;
  reasonFailure: string;
};

export type CancelledDeliverType = {
  id: number;
  orderId: number;
  img: null;
  customerName: string;
  email: string;
  reasonCancel: string;
  shippingAddress: string;
};

export type ReturnOrderType = {
  orderId: number;
  img: null;
  customerName: string;
  returnReason: string;
  returnStatus: string;
  returnDate: string;
};

//* page content interface
export interface RouteData {
  path_key: string;
  path: string;
  title: string;
  icon: string;
}

export interface Submenu {
  path: string;
  path_key: string;
  title: string;
  icon: string;
}

export interface RouteType {
  path: string;
  path_key: string;
  title: string;
  icon: string;
  routeData: {
    path: string;
    path_key: string;
    title: string;
    icon: string;
  };
}

export interface MenuListProps {
  filteredData: any[]; // Adjust type as per your actual data structure
  tabCategory: string;
  handleTabCategory: (value: string) => void;
  tabsMenu: any[]; // Adjust type as per your actual data structure
  quantities: {} | any; // Adjust type as per your actual data structure
  setQuantities: React.Dispatch<React.SetStateAction<{}>>;
  customerId: any; // Adjust type as per your actual data structure
  dataCustomer: any[]; // Adjust type as per your actual data structure
}

export interface OrderListProps {
  customerId: any;
  dataCustomer: any;
}

export interface PaymentProps {
  customerId: any;
  dataCustomer: any;
}

export interface PaymentMethod {
  icon: ReactNode;
  label: string;
}
