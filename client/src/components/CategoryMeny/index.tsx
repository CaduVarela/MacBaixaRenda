import { categoriesList } from "@/utils/constants";
import { useState } from "react";
import styles from "./CategoryMenu.module.scss";

export default function CategoryMeny() {
  const [categoryActive, setCategoryActive] = useState("");

  const onCategoryClick = (id: string) => {
    setCategoryActive(id);
    // category(id);
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
                categoryActive === category?.id ? styles.activeCategory : ''
              }
            >
              <Icon size={40} className={styles.icons} />
              <span className={styles.textCategory}>{category?.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
