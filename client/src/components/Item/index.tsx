import Image from "next/image";
import styles from "./Item.module.scss";
import { IFood } from "@component/utils/types";
import { useStore } from "@component/store/store";

interface ItemProps {
  item: IFood;
}

export default function Item({ item }: ItemProps) {
  const { addToCart } = useStore();

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <div
      className={`${styles.item} flex flex-col justify-between items-center`}
      onClick={handleAddToCart}
    >
      <div className={`${styles.imgFood} ${item?.offer && "mb-[1rem]"} h-full`}>
        {item?.offer && <div className={`${styles.offer}`}>oferta</div>}
        <Image
          src={item.imgLink ?? ''}
          alt={item?.name}
          width={110}
          height={110}
          unoptimized
        />
      </div>
      <div className="flex flex-col justify-between w-full h-full max-h-full">
        <h2 className="font-bold">{item?.name}</h2>
        <p className={styles.description}>{item?.description}</p>
        <p
          className={`${styles.textPrice} text-[1.1rem] font-bold text-yellow`}
        >{`R$ ${
          item?.price?.toLocaleString("pt-br", {
            minimumFractionDigits: 2,
          }) ?? "0,00"
        }`}</p>
      </div>
    </div>
  );
}
