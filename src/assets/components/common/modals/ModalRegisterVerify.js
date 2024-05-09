import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ModalRegisterVerify = ({ isOpen, toggle, error, mensajeError }) => {
  const navigate = useNavigate();
  const emailVerificacion = useSelector(
    (state) => state.auth.emailVerificacion
  );
  const title = error ? "Ups, algo no está bien" : "Verificación de Usuario";

  const enviarLogin = () => {
    navigate("/");
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        open={isOpen}
        onClose={() => {}}
      >
        <div className="fixed inset-0" />
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all my-8 max-w-sm w-full p-6">
                <form className="">
                  <div className="block absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={toggle}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  {/*Aqui va el titulo del modal centrado */}
                  <div className="flex justify-center items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                  </div>
                  {error ? (
                    <div className="flex justify-center items-center mt-4">
                      <XCircleIcon className="h-8 w-8 text-red-700" />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center mt-4">
                      <CheckCircleIcon className="h-8 w-8 text-green-700" />
                    </div>
                  )}

                  <div className="justify-center items-center space-y-6 pt-6 pb-5 px-4 sm:px-6">
                    {error && <p className="text-center">{mensajeError}</p>}

                    {!error && (
                      <>
                        <p className="text-center">
                          Se envió un enlace de verificación al correo:
                        </p>
                        <p className="text-center text-blue-dark font-medium">
                          {emailVerificacion}
                        </p>
                        <p className="text-center">
                          Por favor revisa tu bandeja de entrada o en correos no
                          deseados y da clic en Verificar usuario.
                        </p>
                      </>
                    )}
                  </div>

                  {/*Aqui va el boton de enviar al login*/}
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-primarymarkup-100 text-base font-medium text-white hover:bg-primarymarkup-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primarymarkup-500 sm:text-sm"
                      onClick={()=>enviarLogin()}
                    >
                      Aceptar
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default ModalRegisterVerify;
