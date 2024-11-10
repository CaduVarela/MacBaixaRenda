import { IconType } from "react-icons";

export interface IFood {
  description: string;
  id: number;
  name: string;
  offer: boolean;
  price: number;
  quantity: number;
  observations?: string | undefined;
}

export interface IcategoriesList {
  label: string;
  icon: IconType;
  id: string;
}

export interface IStatus {
  id: number;
  type: string;
}