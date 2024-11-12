import React, { useState, useEffect, useCallback } from "react";
import Modal from "@mui/material/Modal";
import { IForm } from "@component/store/types";
import styles from "./EditOrderModal.module.scss";
import { phoneMask } from "@component/utils/phoneMask";

interface IProps {
  open: boolean;
  handleClose: () => void;
  order: IForm | null;
  onSave: (form: IForm) => void;
}

const EditOrderModal = ({ open, handleClose, order, onSave }: IProps) => {
  const [form, setForm] = useState(order);
  const [selectPayment, setSelectedPayment] = useState<string>(order?.paymentType ?? 'card');

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      if (prevForm) {
        return {
          ...prevForm,
          [name]: value,
        };
      }
      return prevForm;
    });
  }, []);

  const handleSave = useCallback(() => {
    if (form) {
      onSave({ ...form });
    }
    handleClose();
  }, [form, handleClose, onSave]);

  useEffect(() => {
    setForm(order);
  }, [order]);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className={styles.modalContent}>
          <h1 className="text-[1.5rem] font-bold text-start">Editar Pedido</h1>
          <form className="w-full space-y-3">
            <label htmlFor="name" className="font-semibold">
              Nome:
            </label>
            <input
              type="text"
              name="name"
              value={form?.name || ""}
              onChange={handleInputChange}
            />

            <label htmlFor="cellphone" className="font-semibold">
              Celular:
            </label>
            <input
              name="phone"
              id="cellphone"
              placeholder="Seu celular"
              type="text"
              required
              className="md:w-1/2 w-full"
              value={phoneMask(form?.phone as string)}
              maxLength={14}
              onChange={handleInputChange}
            />

            <p className="font-semibold mb-3">Método de pagamento:</p>
            <div className="flex items-center space-x-5 justify-start">
              <div className="space-x-1 flex items-center justify-start">
                <input
                  type="radio"
                  className={styles.radio}
                  id="card"
                  name="paymentType"
                  value="card"
                  checked={selectPayment === 'card' || selectPayment === 'cartão'}
                  onChange={(e) => {
                    setSelectedPayment(e?.target?.value);
                    handleInputChange(e);
                  }}
                />
                <label htmlFor="card" className="text-dark-grey">Cartão</label>
              </div>
              <div className="space-x-1 flex items-center justify-start">
                <input
                  type="radio"
                  className={styles.radio}
                  id="pix"
                  name="paymentType"
                  value="pix"
                  checked={selectPayment === 'pix'}
                  onChange={(e) => {
                    setSelectedPayment(e?.target?.value);
                    handleInputChange(e);
                  }}
                />
                <label htmlFor="pix" className="text-dark-grey">Pix</label>
              </div>
              <div className="space-x-1 flex items-center justify-start">
                <input
                  type="radio"
                  className={styles.radio}
                  id="dinheiro"
                  name="paymentType"
                  value="dinheiro"
                  checked={selectPayment === 'dinheiro'}
                  onChange={(e) => {
                    setSelectedPayment(e?.target?.value);
                    handleInputChange(e);
                  }}
                />
                <label htmlFor="dinheiro" className="text-dark-grey">Dinheiro</label>
              </div>
            </div>
          </form>
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={handleSave} className="btnStyles py-1">Salvar</button>
            <button onClick={handleClose} className="btnCancel py-1">Cancelar</button>
          </div>
        </div>
      </Modal>
    </>

  );
};

export default EditOrderModal;
