import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";

export default function NotFoundPage() {
  const nameKeyPagina = {
    nameKeyAplicacion: "notFound",
    nameKeyModulo: "",
    nameKeySubModulo: "",
  };
  return (
    <Layout nameKeyPagina={nameKeyPagina}>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 w-full">
        <div className="text-center">
          <p className="text-base font-semibold text-azulredmedica-100">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Página no encontrada
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Disculpa, no pudimos encontrar la página que estás buscando.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-azulredmedica-100 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-azulredmedica-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Volver a la página de inicio
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}