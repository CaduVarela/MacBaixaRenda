import Link from "next/link";
import styles from "../styles/Order.module.scss";
import { CgArrowLongLeft } from "react-icons/cg";
import Dashboard from "@component/components/Dashboard";

export default function Order() {
  return (
    <section className="p-5 h-[100vh]">
      <div>
      <Link
        href="/"
        className="font-bold text-[1.1rem] flex items-center gap-1 mb-4"
      >
        <CgArrowLongLeft className="h-[23px] w-[23px]" />
        Voltar
      </Link>
      </div>
      <div className={`${styles.container} max-w-[1000px]`}>
        <h1 className={styles.titlePage}>Gerenciar pedidos</h1>
        <Dashboard/>
      </div>
    </section>
  );
}