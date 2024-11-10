import { categoriesList } from "@component/utils/constants";
import { useState } from "react";
import styles from "./CategoryMenu.module.scss";
import { useStore } from "../../store/store";
import Link from "next/link";
import { BsGear } from "react-icons/bs";

export default function CategoryMeny() {
  const [categoryActive, setCategoryActive] = useState("");
  const category = useStore((state) => state.changeCategory);

  const onCategoryClick = (id: string) => {
    setCategoryActive(id);
    category(id);
  };

  return (
    <div className={styles.categoryMenu}>
      <ul className={styles.scrollbar}>
        {categoriesList?.map((category) => {
          const Icon = category?.icon;
          return (
            <li
              key={category?.id}
              onClick={() => onCategoryClick(category?.id)}
              className={
                categoryActive === category?.id ? styles.activeCategory : ""
              }
            >
              <Icon size={40} className={styles.icons} />
              <span className={styles.textCategory}>{category?.label}</span>
            </li>
          );
        })}

        <Link href="/Order" className="md:mt-5 flex flex-col items-center justify-center space-y-1">
          <BsGear size={35} className={styles.icons} />
          <span className={styles.textCategory}>Gerenciamento</span>
        </Link>
      </ul>
    </div>
  );
}
