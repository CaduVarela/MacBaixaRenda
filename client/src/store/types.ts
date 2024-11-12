import { IFood } from "@component/utils/types";

export interface StateOne {
  totalPrice: any;
  cart: IFood[];
  selectedCategory: string;
  changeCategory: (selectedCategory: StateOne["selectedCategory"]) => void;
  addToCart: (newItem: any) => void;
  deleteItem: (deleteItem: any) => void;
  totalItems: (state: StateOne) => number;
  updateObservations: (id: number, observations: string | undefined) => void;
  cleanCart: () => void;
}

export interface IForm {
  id: number;
  name: string;
  phone: string | number;
  cep?: string | number;
  street?: string;
  number?: string | number;
  city?: string;
  state?: string;
  neighborhood?: string;
  deliveryType: string;
  paymentType: string;
  products?: IFood[];
  status?: {
    id: number,
    type: string
  };
  index?: number; 
}

export interface StateTwo {
  form: {
    name: string;
    celular: string | number;
    cep?: string | number;
    street?: string;
    number?: string | number;
    city?: string;
    state?: string;
    neighborhood?: string;
    deliveryType: string;
    paymentType: string;
  };
  dataForm: IForm[];
  addDataForm: (newData: any) => void;
  cleanValues: () => void;
  deleteAddress: () => void;
  deleteData: (id: any) => void;
}