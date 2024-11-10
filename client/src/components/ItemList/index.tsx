import { useEffect, useState } from "react";
import Item from "../Item";
import styles from "./ItemsList.module.scss";
import { useStore } from "@component/store/store";
import { IFood } from "@component/utils/types";
import Loading from "../Loading";
import { capitalizeFirstLetter } from "@component/utils/capitalizeFirstLetter";

export default function ItemsList() {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { selectedCategory } = useStore();

  async function fetchApi() {
    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:3001/${selectedCategory}`);
      const responseParsed = await response.json();
      setFoods(responseParsed);
      setLoading(false);
      setIsReady(true);
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    fetchApi();
  }, [selectedCategory]);

  return (
    <>
      {isReady && (
        <div
          className={`${styles.container} ${
            loading && "justify-center items-center w-full"
          } w-full flex flex-col`}
        >
          {loading ? (
            <Loading active={loading} />
          ) : (
            <>
              <h3 className="mb-5 font-semibold text-[1.2rem]">
                {capitalizeFirstLetter(selectedCategory)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {foods?.map((element) => (
                  <Item key={element?.id} item={element} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
