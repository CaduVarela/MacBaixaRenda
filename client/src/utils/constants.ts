import { CiBurger, CiFries, CiIceCream, CiPizza, CiBeerMugFull } from "react-icons/ci";
import { IcategoriesList } from "./types";

export const categoriesList: IcategoriesList[] = [
    { label: 'Pizza', icon: CiPizza, id: 'pizza' },
    { label: 'Bebidas', icon: CiBeerMugFull, id: 'bebidas' },
    { label: 'Doces', icon: CiIceCream, id: 'doces' },
    { label: 'Combos', icon: CiFries, id: 'combos' },
    { label: 'Burguers', icon: CiBurger, id: 'burguers' }
  ]