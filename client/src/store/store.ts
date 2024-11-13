import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StateOne, StateTwo } from "./types";
import { createJSONStorage } from "zustand/middleware";

export const useStore = create(
  persist<StateOne>(
    (set) => ({
  selectedCategory: "pizza",
  cart: [],
  totalPrice: 0,

  changeCategory: (selectedCategory) =>
    set(() => ({ selectedCategory: selectedCategory })),

  cleanCart: () => {
    set({ cart: [], totalPrice: 0 });
  },

  updateObservations: (id, observations) =>
    set((state) => {
      const index = state.cart.findIndex((item) => item.id === id);

      if (index >= 0) {
        const updatedCartItem = {
          ...state.cart[index],
          observations: observations,
        };
        const updatedCart = [
          ...state.cart.slice(0, index),
          updatedCartItem,
          ...state.cart.slice(index + 1),
        ];
        return { cart: updatedCart };
      }
      return state;
    }),

  addToCart: (newItem) =>
    set((state) => {
      const cartItem = state.cart.find((item) => item.id === newItem.id);
      const index = state.cart.findIndex((item) => item.id === newItem.id);

      if (cartItem) {
        const updatedCartItem = {
          ...cartItem,
          quantity: cartItem.quantity + 1,
        };
        const updatedCart = [
          ...state.cart.slice(0, index),
          updatedCartItem,
          ...state.cart.slice(index + 1),
        ];
        const totalPrice = updatedCart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        return { cart: updatedCart, totalPrice };
      } else {

        const itemWithObservations = { ...newItem, quantity: 1, observations: '' };
        return {
          cart: [...state.cart, itemWithObservations],
          totalPrice: state.totalPrice + newItem.price,
        };
      }
    }),

  deleteItem: (deleteItem) =>
    set((state) => {
      const index = state.cart.findIndex((item) => item.id === deleteItem.id);
      const cartItem = state.cart[index];

      if (cartItem && cartItem.quantity > 1) {
        const updatedCartItem = {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        };

        const updatedCart = [
          ...state.cart.slice(0, index),
          updatedCartItem,
          ...state.cart.slice(index + 1),
        ];
        const totalPrice = updatedCart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        return { cart: updatedCart, totalPrice };
      } else {
        const filteredCart = state.cart.filter(
          (item) => item.id !== deleteItem.id
        );
        const totalPrice = filteredCart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        return { cart: filteredCart, totalPrice };
      }
    }),

  totalItems: (state) => {
    return state.cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  },
}),
  {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage),
  }
));

export const useFormStore = create(
  persist<StateTwo>(
    (set) => ({
      form: {
        name: "",
        phone: "",
        cep: "",
        street: "",
        number: "",
        city: "",
        state: "",
        neighborhood: "",
        deliveryType: "loja",
        paymentType: "cartão",
      },
      dataForm: [],

      cleanValues: () =>
        set((prevState) => ({
          ...prevState,
          form: {
            ...prevState?.form,
            name: "",
            phone: "",
            cep: "",
            street: "",
            number: "",
            city: "",
            state: "",
            neighborhood: "",
            deliveryType: "loja",
            paymentType: "cartão",
          },
        })),

      deleteAddress: () =>
        set((prevState) => {
          const { name, phone, paymentType, deliveryType } = prevState.form; // mantém apenas nome e celular
          return {
            ...prevState,
            form: {
              name,
              phone,
              deliveryType,
              paymentType,
            },
          };
        }),

      addDataForm: (newData) =>
        set((state) => ({
          dataForm: [...state.dataForm, { ...newData }],
        })),

      deleteData: (index) => {
        set((state) => {
          const newDataForm = [...state.dataForm];
          newDataForm.splice(index, 1);
          return { dataForm: newDataForm };
        });
      },

    }),
    {
      name: "form-storage",
      storage: createJSONStorage(() => localStorage),
      // apenas o dataForm no persist
      partialize: (state) => ({ ...state, dataForm: state.dataForm})
    }
  )
);
