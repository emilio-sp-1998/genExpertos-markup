import React, { useState } from "react";
import ImageView from "./ImageView";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";

const ArchivoThumbnail = ({ archivo, pos }) => {
  const [isOpenArchivo, setIsOpenArchivo] = useState(false);
  const handleImg = () => {
    setIsOpenArchivo(!isOpenArchivo);
  };
  return (
    <>
      {archivo.url.includes(".pdf") ? (
        <div
          className={
            pos === "left"
              ? "flex"
              : pos === "right"
              ? "flex justify-end"
              : "flex justify-center"
          }
        >
          <a
            className="flex justify-end border rounded-lg bg-primarymarkup-100 hover:bg-primarymarkup-200 p-2"
            href={archivo.url}
            download
            target="_blank"
          >
            <DocumentArrowDownIcon
              className="h-6 w-6 cursor-pointer text-white"
              aria-hidden="true"
            />
            <p className="my-auto mx-1 text-white">Descargar PDF</p>
          </a>
        </div>
      ) : (
        <div
          className={
            pos === "left"
              ? "flex"
              : pos === "right"
              ? "flex justify-end"
              : "flex justify-center"
          }
        >
          <ImageView img={archivo} isOpen={isOpenArchivo} toggle={handleImg} />
          <div
            onClick={() => handleImg()}
            className={
              pos === "left"
                ? "flex max-w-xs p-2 bg-gray-100 border border-gray-200 hover:bg-gray-200 hover:border-gray-300 cursor-pointer rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                : "flex max-w-xs p-2 bg-primarymarkup-100 bg-opacity-5 border border-gray-200 hover:bg-opacity-20 hover:border-azul-300 cursor-pointer rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            }
          >
            <img
              className="h-auto w-auto rounded-lg"
              src={archivo.url}
              alt={archivo.name}
            />
          </div>
          <br />
        </div>
      )}
    </>
  );
};
export default ArchivoThumbnail;
