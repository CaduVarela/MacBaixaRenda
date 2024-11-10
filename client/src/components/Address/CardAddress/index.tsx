import { useFormStore } from "@component/store/store";
import styles from "./CardAddress.module.scss";

export default function CardAddress() {
  const form = useFormStore((s) => s.form);

  return (
    <>
      {form?.city &&
        form?.state &&
        form?.street &&
        form?.neighborhood &&
        form?.number && (
          <div className={styles.container}>
            <p>{`${form?.city} - ${form?.state}`}</p>
            <p>{`${form?.street}, ${form?.neighborhood}, ${form?.number}`}</p>
          </div>
        )}
    </>
  );
}
