import { useStore } from "@component/store/store";
import styles from "./Cart.module.scss";
import CartItem from "../CartItem";
import Link from "next/link";
import { useContext } from "react";
import { ToastContext } from "@component/context/ToastContext";
import { BsTrash } from "react-icons/bs";

interface ICart {
  extendedClass?: string;
  buttonActive: boolean;
}

export default function Cart({ extendedClass, buttonActive }: ICart) {
  const { showToast } = useContext(ToastContext);
  const { cart, totalPrice, cleanCart } = useStore();

  const removeAllItemsFromCart = () => {
    cleanCart();
    showToast({ message: "Items removidos com sucesso!", status: "success" });
  };

  return (
    <section
      className={`${styles.section} ${
        extendedClass ? extendedClass : "min-w-[500px]"
      }`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className={`flex flex-col gap-5`}>
          <h3 className="text-[1.3rem] font-semibold">Seu pedido</h3>
          {cart?.length > 0 ? (
            <div className={`${styles.container} flex flex-col gap-5`}>
              {cart?.map((element) => (
                <CartItem key={element?.id} item={element} />
              ))}
            </div>
          ) : (
            <p className="text-pink font-semibold">
              Seu carrinho está vazio :(
            </p>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between">
            {cart?.length > 1 && buttonActive && (
              <div
                onClick={removeAllItemsFromCart}
                className="text-dark-grey flex items-center justify-end mr-5 gap-2 mb-4 cursor-pointer"
              >
                <BsTrash />
                <p className="text-dark-grey">Esvaziar carrinho</p>
              </div>
            )}

            {cart?.length > 0 && (
              <div className="flex justify-end mr-5 gap-3 mb-4">
                <p className="text-[1.1rem] font-semibold">Total:</p>
                <span className="text-[1.1rem] font-bold text-yellow">
                  {`R$ ${totalPrice?.toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                  })}`}
                </span>
              </div>
            )}
          </div>
          <div
            className={
              buttonActive ? "flex items-center justify-center" : "hidden"
            }
          >
            <Link
              href="/Payment"
              className={
                cart?.length < 1 ? `${styles.btnDisabled}` : `${styles.btn}`
              }
            >
              Finalizar compra
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
