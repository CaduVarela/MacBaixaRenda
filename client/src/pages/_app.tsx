import "@component/styles/globals.scss";
import type { AppProps } from "next/app";
import { ToastProvider } from "@component/context/ToastContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </>
  );
}
