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

//* TABLE CONTEXT HEADER TABLE
export interface TableContextType {
  children: ReactNode;
  page: string | any;
  setPage: (page: string) => void;
  placeHolder: string | any;
  columnName: string | any;
  rowsSelection: string | any;
  jsx: React.ReactNode;
  tablesOptionsJsx: React.ReactNode;
  selectedOption: any;
  tablesOptions: any;
  setSelectedOption: any;
  setTablesOptions: any;
}

//* REDUX INTERFACE
export interface menuState {
  data: object;
  updateCustomer: object;
  removeCustomer: object;
  removeProduct: object;
  status: string;
  loading: boolean;
  loadingAddCart: boolean;
  loadingPurchase: boolean;
  error: string | null | any;
}

export interface DashboardState {
  data: object;
  status: string;
  error: string | null | any;
  voidMessage: string;
}

export interface InventoryState {
  data: object;
  status: string;
  error: string | null | any;
  updateParentErrorMessage: string | null | any;
  updateChildMessage: string | null | any;
  loadingTable: boolean;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  loadingCreateChild: boolean;
}

export interface UserState {
  sidebar: any[];
  data: object | any;
  status: string;
  profileStatus: string;
  profileData: object | any;
  loading: boolean;
  loadingEudevice: boolean;
  loadingSignIn: boolean;
  errorNavbar: any;
  errorCompleteProfile: any;
  user: object;
  userInfo: object | any;
  error: string | null | any;
  getRegions: object | any;
  getProvinces: object | any;
  getMunicipality: object | any;
  getBarangay: object | any;
  completeProfile: object | any;
  settingsProfileData: object | any;
  updateSettingsProfileData: object | any;
  updateEmailProfileData: object | any;
  resendCodeEmailData: object | any;
  resendCodePasswordData: object | any;
  updatePasswordProfileData: object | any;
  uploadImageData: object | any;
}

export interface UsersManagementState {
  data: object;
  status: string;
  loading: boolean;
  loadingCreateUser: boolean;
  error: string | null | any;
  editUserError: string | null | any;
  editUserInfoError: string | null | any;
  loadingEditUser: string | null | any;
  loadingEditUserInfo: string | null | any;
}

export interface ApiConfig {
  url: string;
  method: string;
  data?: any;
}

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

//* DASHBOARD INTERFACE

export interface DashboardInterface {
  Datatransaction: {
    transactId: number;
    img: any;
    customerId: string;
    date: string;
    time: string;
    amount: number;
    status: string;
  };

  chart: any;
  DataChart: {
    name: string;
    total: number;
  };

  data: {
    chart: Record<string, any>;
  };

  routeData: {
    path: string;
    path_key: string;
    title: string;
    icon: string;
  };

  path_key: string;
  path: string;
  title: string;
  icon: string;
  search: string;
}

export interface DataTransaction {
  transactId: number;
  img: any;
  customerId: string;
  date: string;
  time: string;
  amount: number;
  status: string;
}

//* MENU INTERFACE

export interface MenuInterface {
  routeData: {
    path: string;
    path_key: string;
    title: string;
    icon: string;
  };
}

export interface MenuListProps {
  filteredData: any[];
  tabCategory: string;
  handleTabCategory: (value: string) => void;
  tabsMenu: any[];
  quantities: {} | any;
  setQuantities: React.Dispatch<React.SetStateAction<{}>>;
  customerId: any;
  dataCustomer: any[];
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

//* INVENTORY INTERFACE TYPE
export interface ParentInventory {
  productName: string;
  productCategory: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  category: any;
  title: any;
}
export interface InventoryResponse {
  message: any;
  data: {
    inventory_id: any;
    inventory: InventoryItem[] | any | string;
    buttons: any;
    filter_category: any;
    category: any;
    title: any;
    message: any;
  };
}

export interface InventoryListProps {
  filteredData: any[];
}

export interface ErrorMessages {
  [key: string]: any;
  product_name?: any;
  product_category?: any;
}

//* USERS MANAGEMENT INTERFACE
