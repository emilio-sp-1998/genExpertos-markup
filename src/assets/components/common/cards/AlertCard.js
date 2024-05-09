import React from "react";
import {
  CheckCircleIcon,
  XMarkIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function AlertCard({ type=4, message, setShowAlert }) {
  return (
    <div
      className={classNames(
        type === 1 ? "bg-green-50" : type===2 ?"bg-red-50": type===3? "bg-yellow-50": "bg-blue-50",
        "p-2 rounded-md"
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {type === 1 ? (
            <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true"/>
          ) : type === 2 ?(
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          ): type === 3 ? (
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          ): (
            <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />)}
        </div>
        <div className="ml-3">
          <h3
            className={classNames(
              type === 1 ? "text-green-700" : type===2 ?"text-red-700": type===3? "text-yellow-700": "text-blue-700",
              "text-sm font-medium"
            )}
          >
            {message}
          </h3>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={() => setShowAlert(false)}
              className={classNames(
                type === 1 ? "bg-green-50  text-green-500 hover:bg-green-100  focus:ring-green-600  focus:ring-offset-green-50" : type===2 ?"bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50": type===3? "bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50": "bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50",
                "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
              )}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
