import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Logo from "../../../../images/logo/markuplogo2.svg";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import FloatingInput from "../../../common/inputs/FloatingInput";
import { useNavigate } from "react-router-dom";