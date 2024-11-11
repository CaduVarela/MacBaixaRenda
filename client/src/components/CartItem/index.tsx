import styles from "./CartItem.module.scss";
import Image from "next/image";
import { IFood } from "@component/utils/types";
import Accordion from "@mui/material/Accordion";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import Observations from "../Observations";

interface IProps {
  item: IFood;
}

export default function CartItem({ item }: IProps) {
  return (
    <div className={styles.container}>
      <Accordion className="w-full">
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <div className={styles.item}>
            <div
              className={`${styles.product} flex justify-between items-center gap-3`}
            >
              <div className={styles.image}>
                <Image
                  src={item.imgLink ?? ""}
                  alt={item?.name}
                  width={50}
                  height={50}
                  unoptimized
                />
              </div>
              <div className={`${styles.description}`}>
                <h4 className="text-[1.1rem] font-semibold">{item?.name}</h4>
                <p
                  className={`${styles.obsText} text-[0.8rem] cursor-pointer ${
                    (item?.observations === undefined ||
                      item?.observations === "") &&
                    "underline decoration-solid"
                  } text-dark-grey`}
                >
                  {item?.observations === undefined || item?.observations === ""
                    ? "Adicionar observação"
                    : item?.observations}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end justify-center">
              <div className="flex items-center text-[1.1rem] font-bold text-yellow">{`R$ ${item?.price?.toLocaleString(
                "pt-br",
                {
                  minimumFractionDigits: 2,
                }
              )}`}</div>
              <span className="text-[0.8rem] font-bold text-dark-grey">
                {item?.quantity}x
              </span>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Observations item={item} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
