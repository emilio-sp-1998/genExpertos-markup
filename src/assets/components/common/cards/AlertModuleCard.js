import React from "react";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function AlertModuleCard({ message, link, cerrarButton }) {
  return (
    <div className="flex border rounded-lg w-full">
      <div className="border-l-8 border-azulredmedica-50 p-4 rounded-s-lg w-full">
        <div className="flex">
          <div className="flex bg-azulredmedica-50 h-8 w-8 rounded-full justify-center items-center font-extrabold">
            <ExclamationCircleIcon
              className="h-6 w-6 text-white"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-500">
              {message + " "}
              <Link
                to={link}
                className="font-medium text-azulredmedica-50 underline hover:text-azulredmedica-100"
              >
                Aqui.
              </Link>
            </p>
          </div>
          <div className="ml-auto pl-3">
            {cerrarButton && (
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  className="inline-flex rounded-md p-1.5 hover:bg-gray-100 text-gray-400"
                >
                  <span className="sr-only">Dismiss</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
