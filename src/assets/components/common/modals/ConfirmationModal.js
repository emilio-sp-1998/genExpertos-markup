import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ConfirmationModal = ({
  isOpen,
  toggle2,
  title,
  message,
  toggleConfirmation,
  option = null,
}) => {
  const cancelButtonRef = useRef(null);
  const actionConfirm = (confir) => {
    toggleConfirmation(confir);
    toggle2();
  };
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40"
        initialFocus={cancelButtonRef}
        onClose={() => actionConfirm(false)}
      >
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

        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-center w-full">
                  <div className="mt-3 text-center sm:mt-0 sm:text-center w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-primarymarkup-100"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-700">{message}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 flex flex-wrap w-full justify-center">
                  <div className="flex w-full sm:w-1/2 px-2 justify-center py-2">
                    <button
                      type="button"
                      className="w-full h-12 rounded-lg border border-primarymarkup-100 py-2 px-4 text-base font-bold text-primarymarkup-100 shadow-sm hover:bg-primarymarkup-100 hover:text-white hover:font-extrabold"
                      onClick={() => actionConfirm(true)}
                    >
                      {option === "cancelarRegistro" ? "Si" : "Aceptar"}
                    </button>
                  </div>
                  <div className="flex w-full sm:w-1/2 px-2 justify-center py-2">
                    <button
                      type="button"
                      className="w-full h-12 rounded-lg border border-secondarymarkup-100 py-2 px-4 text-base font-bold text-secondarymarkup-100 shadow-sm hover:bg-secondarymarkup-100 hover:text-white hover:font-extrabold"
                      onClick={() => actionConfirm(false)}
                      ref={cancelButtonRef}
                    >
                      {option === "cancelarRegistro" ? "No" : "Cancelar"}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default ConfirmationModal;
