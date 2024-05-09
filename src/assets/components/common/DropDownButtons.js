import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDownButtons({
  handleModal,
  actions,
  idRegistro,
  username="",
}) {
  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div className="flex w-full">
        <Menu.Button className="w-full items-center rounded-full text-primarymarkup-100 focus:outline-none focus:ring-2 focus:ring-primarymarkup-100 focus:ring-offset-2 focus:ring-offset-gray-100">
          <span className="sr-only">Open options</span>
          <EllipsisHorizontalIcon
            className="h-7 w-7 mx-auto"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 top-2 right-8 w-32 origin-bottom rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {actions.map((action) => {
              return (
                <Menu.Item key={action.namekey}>
                  {({ active }) => (
                    <a
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-2 py-2 text-sm cursor-pointer"
                      )}
                      onClick={() =>
                        handleModal(action.namekey, idRegistro, username)
                      }
                    >
                      {action.text}
                    </a>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
