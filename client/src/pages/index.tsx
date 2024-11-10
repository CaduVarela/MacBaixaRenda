import Head from "next/head";
import BasicPage from "./BasicPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Restaurante</title>
        <meta name="description" content="Restaurante para o trabalho de web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <BasicPage/>
      </main>
    </>
  );
}
