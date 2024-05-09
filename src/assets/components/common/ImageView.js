import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ImageView = ({ isOpen = false, toggle, img }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative"
        open={isOpen}
        onClose={() => toggle()}
      >
        <div className="fixed" />
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-20 inset-0 overflow-y-auto">
          <div
            className={
              "flex min-h-full  items-center justify-center p-2 text-center"
            }
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" />

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`flex-grow relative bg-white rounded-lg lg:mx-32 p-4 text-left overflow-hidden shadow-xl transform transition-all my-8 w-auto`}
              >
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => toggle()}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex justify-center w-auto">
                  <img
                    className="h-auto w-auto rounded-lg"
                    src={img.url}
                    alt={img.name}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default ImageView;
