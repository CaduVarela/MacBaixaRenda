import CategoryMenu from "@component/components/CategoryMenu";
import styles from "../styles/BasicPage.module.scss";
import { useState } from "react";
import UseWindowSize from "@component/hook/useWindowSize";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ItemsList from "@component/components/ItemList";
import Cart from "@component/components/Cart";

export default function BasicPage() {
  const [isOpen, setIsOpen] = useState(false);
  const size = UseWindowSize();

  return (
    <div className={`${styles.container} flex justify-between`}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.cartIcon} ${
          size.width <= 1100 ? "flex" : "hidden"
        }`}
      >
        <AiOutlineShoppingCart />
      </div>

      <CategoryMenu />
      <ItemsList />

      <div
        className={`${
          isOpen && size.width <= 1100 ? styles.menuOverlay : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      />
      {isOpen && size.width <= 1100 && (
        <Cart
          buttonActive={true}
          extendedClass="fixed right-0 h-[100%] w-full msm:w-[80%] md:w-[50%]"
        />
      )}
      {size.width > 1100 && <Cart buttonActive={true} />}
    </div>
  );
}
