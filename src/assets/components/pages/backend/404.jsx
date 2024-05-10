import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../images/logo/markuplogo.png";
export default function NotFoundExt() {
  const navigate = useNavigate();
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 w-full">
      <div className="flex mb-32">
        <img
          className="mx-auto object-cover text-center"
          src={Logo}
          alt="logo-consultorio"
        />
      </div>
      <div className="text-center">
        <p className="text-2xl font-semibold text-azulredmedica-200">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Página no encontrada
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Disculpa, no pudimos encontrar la página que estás buscando.
        </p>
      </div>
      <div className="flex justify-center mt-8">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="rounded-md bg-azulredmedica-100 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-azulredmedica-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Volver a la página de inicio
        </button>
      </div>
    </main>
  );
}