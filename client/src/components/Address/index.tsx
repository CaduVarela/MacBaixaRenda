import { ChangeEvent, useCallback, useContext } from "react";
import styles from "./Address.module.scss";
import { useFormStore } from "@component/store/store";
import { formAddress } from "@component/modules/schemas";
import { ToastContext } from "@component/context/ToastContext";
import { removeNumbers } from "@component/utils/removeNumbers";
import { cepMask } from "@component/utils/cepMask";
import { removeLetters } from "@component/utils/removeLetters";

interface IAddress {
  closeModal: () => void;
}

export default function Address({ closeModal }: IAddress) {
  const { showToast } = useContext(ToastContext);
  const form = useFormStore((s) => s.form);

  const handleInputChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    useFormStore.setState((s) => ({
      ...s,
      form: {
        ...s.form,
        [name]: value,
      },
    }));
  };

  const searchCEP = useCallback(async (e: string) => {
    try {
      const cepNewLength = e.includes("-") ? 9 : 8;

      if (e.length == cepNewLength) {
        const res = await fetch(`https://viacep.com.br/ws/${e}/json/`);
        const data = await res.json();

        useFormStore.setState((prevState) => ({
          ...prevState,
          form: {
            ...prevState.form,
            city: data?.cep ? data?.localidade : "",
            street: data?.cep ? data?.logradouro : "",
            state: data?.cep ? data?.uf : "",
            neighborhood: data?.cep ? data?.bairro : "",
          },
        }));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getCep = (e: string) => {
    useFormStore.setState((s) => ({ ...s, form: { ...s.form, cep: e } }));
    searchCEP(e);
  };

  const handleClickSaveAddress = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        await formAddress.validate({
          cep: form?.cep,
          street: form?.street,
          number: form?.number,
          city: form?.city,
          state: form?.state,
          neighborhood: form?.neighborhood,
        });
        localStorage.setItem("address", JSON.stringify(form));
        onSave(e);
        showToast({
          message: "Endereço salvo com sucesso!",
          status: "success",
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          showToast({ message: error.message, status: "error" });
          console.warn(error.message);
        } else {
          console.warn("Unexpected error", error);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      form?.cep,
      form?.city,
      form?.neighborhood,
      form?.number,
      form?.state,
      form?.street,
      showToast,
    ]
  );

  const onSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className={styles.containerModal}>
      <h1 className="text-[1.5rem] w-full font-bold text-start">
        Adicionar endereço
      </h1>
      <form className="w-full space-y-3">
        <div className="w-full flex flex-col items-start space-y-2">
          <label htmlFor="cep" className="font-semibold">
            CEP*
          </label>
          <input
            name="cep"
            id="cep"
            tabIndex={1}
            maxLength={9}
            value={cepMask(form?.cep as string) ?? ""}
            onChange={(e) => getCep(removeLetters(e.target.value?.trimStart()))}
            required
            placeholder="Digite seu CEP"
            type="text"
          />
        </div>
        <div className="flex items-center flex-col space-y-3 ltm:space-y-0 ltm:flex-row ltm:space-x-5">
          <div className="w-full flex flex-col items-start space-y-2 ltm:w-[30%]">
            <label htmlFor="city" className="font-semibold">
              Cidade*
            </label>
            <input
              name="city"
              id="city"
              value={removeNumbers(form?.city as string) ?? ""}
              onChange={handleInputChange}
              required
              placeholder="Cidade"
              type="text"
            />
          </div>

          <div className="w-full flex flex-col items-start space-y-2 ltm:w-[20%]">
            <label htmlFor="state" className="font-semibold">
              Estado*
            </label>
            <input
              name="state"
              id="state"
              value={removeNumbers(form?.state as string) ?? ""}
              onChange={handleInputChange}
              required
              placeholder="Estado"
              type="text"
            />
          </div>

          <div className="w-full flex flex-col items-start space-y-2 ltm:w-[60%]">
            <label htmlFor="neighborhood" className="font-semibold">
              Bairro*
            </label>
            <input
              name="neighborhood"
              id="neighborhood"
              value={form?.neighborhood ?? ""}
              onChange={handleInputChange}
              required
              placeholder="Digite o Bairro"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center flex-col space-y-3 ltm:space-y-0 ltm:flex-row ltm:space-x-5">
          <div className="w-full flex flex-col items-start space-y-2 ltm:w-[70%]">
            <label htmlFor="street" className="font-semibold">
              Rua*
            </label>
            <input
              name="street"
              id="street"
              value={form?.street ?? ""}
              onChange={handleInputChange}
              required
              placeholder="Digite sua rua"
              type="text"
            />
          </div>

          <div className="w-full flex flex-col items-start space-y-2 ltm:w-[30%]">
            <label htmlFor="number" className="font-semibold">
              Número*
            </label>
            <input
              name="number"
              id="number"
              value={removeLetters(form?.number as string) ?? ""}
              onChange={handleInputChange}
              required
              placeholder="Digite o número"
              type="text"
            />
          </div>
        </div>
      </form>

      <div className="w-full flex items-center justify-evenly">
        <button onClick={closeModal} className="btnCancel py-1">
          Cancelar
        </button>
        <button
          onClick={(e) => handleClickSaveAddress(e)}
          type="submit"
          className="btnStyles py-1"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
