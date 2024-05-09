import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MSG_ERROR_SERVIDOR } from "../../../redux/types/typesGenerals";
import { useNavigate } from "react-router-dom";
import {
  DocumentArrowUpIcon,
  TrashIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/24/solid";

function ArchivoDownloadInput({
    value,
    name,
    id,
    download,
    label,
    url,
    disabled = false,
    setShowAlert,
    setAlertType,
    setAlertMessage,
    dispatchFunction,
    prefix,
    multiple = false
}) {
    return (
        <div className="flex flex-col w-full">
            <button
            type="button"
            onClick={()=>{download(url)}}
            className="w-full h-12 rounded-lg border border-primarymarkup-100 py-2 px-4 text-base font-bold text-primarymarkup-100 shadow-sm hover:bg-primarymarkup-100 hover:text-white hover:font-extrabold"
            >
                {label}
            </button>
        </div>
    )
}
export default ArchivoDownloadInput;