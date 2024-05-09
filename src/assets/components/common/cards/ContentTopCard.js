import React from "react";
import { format, capitalize } from 'date-fns';
import esLocale from 'date-fns/locale/es';

export default function ContentTopCard() {
  let currentUrl = window.location.href;
  currentUrl = currentUrl.split("?")[0];
  let currentUrlArray = currentUrl.split("/");
  currentUrlArray.shift();
  currentUrlArray.shift();
  currentUrlArray.shift();
  let pages = [];
  currentUrlArray.map((item, index) => {
    pages.push({
      name: item
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()),
      current: index === currentUrlArray.length - 1 ? true : false,
    });
  });
  const length = pages.length;
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM d, yyyy - h:mm a", { locale: esLocale });
  const formattedDateWithCapitalizedMonth = formattedDate.replace(/^\w/, (c) => c.toUpperCase());

  return (
    <div className="flex w-full items-center rounded-lg border border-gray-200 px-2 py-2 shadow-md">
      <div className="flex min-w-0 flex-1">
        <p className="flex flex-col text-lg text-gray-900 font-semibold justify-center">{pages[length-1].name}</p>
        {/*Aqui va la fecha y hora Actual Formateada y alineada a la derecha*/}
        <p className="flex flex-col text-xs text-gray-900 font-light ml-auto justify-center">{formattedDateWithCapitalizedMonth}</p>
      </div>
    </div>
  );
}
