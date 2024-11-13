import Link from "next/link";

export default function NotFound() {
  return (
    <section className="h-[100vh]">
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <h1 className="text-yellow font-bold text-9xl">404</h1>
        <p className="text-dark-grey text-sm">
          Parece que esta página não existe :(
        </p>
        <Link className="mt-5 btnStyles py-1 text-center" href="/">
          Voltar
        </Link>
      </div>
    </section>
  );
}
