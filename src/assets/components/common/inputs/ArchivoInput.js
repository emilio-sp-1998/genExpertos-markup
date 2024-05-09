import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MSG_ERROR_SERVIDOR } from "../../../redux/types/typesGenerals";
import { useNavigate } from "react-router-dom";
import {
  DocumentArrowUpIcon,
  TrashIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/24/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ArchivoInput({
  value,
  name,
  id,
  handleChange,
  label,
  disabled = false,
  setShowAlert,
  setAlertType,
  setAlertMessage,
  dispatchFunction,
  prefix,
  multiple = false,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validFiles = selectedFiles.filter((file) => {
      const allowedExtensions = [".png", ".jpg", ".jpeg", ".pdf"];
      const extension = file.name.slice(
        ((file.name.lastIndexOf(".") - 1) >>> 0) + 2
      );

      return (
        allowedExtensions.includes(`.${extension.toLowerCase()}`) &&
        file.size <= 10 * 1024 * 1024
      );
    });

    if (validFiles.length === 0) {
      setShowAlert(true);
      setAlertType(2);
      setAlertMessage(
        "Error: Solo se permiten archivos de tipo imagen, pdf y hasta 10MB"
      );
      return;
    }

    if (validFiles.length > 3) {
      setShowAlert(true);
      setAlertType(2);
      setAlertMessage("Error: Solo se permiten hasta 3 archivos");
      return;
    }

    const formData = new FormData();
    validFiles.forEach((file, index) => {
      formData.append("file", file);
      formData.append("prefix", prefix);
    });

    dispatch(dispatchFunction(formData))
      .then((res) => {
        // Extrae el enlace del responseData
        if (Object.keys(res).length === 0) {
          setAlertType(2);
          setAlertMessage(MSG_ERROR_SERVIDOR);
          setShowAlert(true);
        } else if (!!res.status) {
          if (res.status === 200) {
            const responseData = { ...res.data, name: res.data.nombre };
            if (responseData) {
              handleChange({
                target: {
                  name: name,
                  value: responseData,
                },
              });
            }
          } else if (res.status === 401) {
            navigate("/logout");
          } else {
            setAlertType(2);
            setAlertMessage("Ah ocurrido un error al subir el archivo");
            setShowAlert(true);
          }
        }
      })
      .catch((errors) => {
        setAlertType(2);
        setAlertMessage(MSG_ERROR_SERVIDOR);
        setShowAlert(true);
      });
  };

  const handleRemoveImage = () => {
    // Eliminar el archivo del arreglo de archivos
    handleChange({
      target: {
        name: name,
        value: {},
      },
    });
  }

  return (
    <div className="flex flex-col w-full">
      <label className="text-xs text-gray-500" htmlFor={id}>
        {label}
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby="file_input_help"
        id={id}
        type="file"
        multiple={multiple}
        onChange={(e) => {
          handleFileChange(e);
        }}
        disabled={disabled}
      />
      <p
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        PNG, JPG, JPEG, PDF hasta 10MB
      </p>

      {!!value.name && (
        <ul className="mt-2 text-gray-600 w-full">
          <li className="flex w-full justify-center">
            <span className="w-auto m-1 text-sm font-semibold">
              {value.name}
            </span>
            <button
              type="button"
              className="text-red-500"
              onClick={() => handleRemoveImage()}
            >
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ArchivoInput;
