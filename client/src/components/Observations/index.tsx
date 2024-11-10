import { useStore } from "@component/store/store";
import styles from "./Observations.module.scss";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { IFood } from "@component/utils/types";

interface IProps {
  item: IFood;
}

export default function ObsModal({ item }: IProps) {
  const { addToCart, deleteItem, updateObservations } = useStore();
  const [open, setOpen] = useState(false);
  const [obs, setObs] = useState(item.observations);

  const removeItem = () => {
    item?.quantity === 1 ? setOpen(true) : deleteItem(item);
  };

  return (
    <div className="space-y-3 w-full">
      <div
        className={`${styles.quantity} flex w-full items-center justify-between`}
      >
        <p className="font-semibold">Quantidade</p>
        <div className="flex gap-[0.5rem]">
          <span
            onClick={removeItem}
            className="text-[1.1rem] font-bold cursor-pointer"
          >
            {" "}
            -{" "}
          </span>
          <span className="text-[1.1rem] font-bold text-yellow">
            {item?.quantity}
          </span>
          <span
            onClick={() => addToCart(item)}
            className="text-[1.1rem] font-semibold cursor-pointer"
          >
            {" "}
            +{" "}
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="font-semibold mb-2">Observações</p>
        <textarea
          placeholder="Coloque suas observações..."
          className={styles.obs}
          id="observations"
          name="observations"
          value={obs}
          onChange={(e) => setObs(e.target.value)}
          rows={5}
          cols={33}
        />
        <div className="w-full mt-3 flex items-center justify-evenly">
          <button
            className={styles.btnRemove}
            onClick={() => updateObservations(item?.id, obs)}
          >
            Salvar
          </button>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.containerModal}>
          <p className="font-bold text-[1.3rem] mb-2">
            Deseja remover esse item do carrinho?
          </p>
          <div className="w-full flex items-center justify-evenly">
            <button className={styles.btnCancel} onClick={() => setOpen(false)}>
              Cancelar
            </button>
            <button
              className={styles.btnRemove}
              onClick={() => deleteItem(item)}
            >
              Sim, remover
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
