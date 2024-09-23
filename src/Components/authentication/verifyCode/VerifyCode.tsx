import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Slide, toast } from "react-toastify";
import PageTitle from "../../PageTitle/PageTitle";

// Define types for form values
interface FormValues {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6?: string; 
}

export default function VerifyPassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputCount, setInputCount] = useState<number>(5); // Start with 5 inputs
  const navigate = useNavigate();

  // Define the validation schema dynamically using Yup
  const validationSchema = Yup.object().shape({
    code1: Yup.string()
      .required("Required")
      .matches(/^\d$/, "Enter a valid number"),
    code2: Yup.string()
      .required("Required")
      .matches(/^\d$/, "Enter a valid number"),
    code3: Yup.string()
      .required("Required")
      .matches(/^\d$/, "Enter a valid number"),
    code4: Yup.string()
      .required("Required")
      .matches(/^\d$/, "Enter a valid number"),
    code5: Yup.string()
      .required("Required")
      .matches(/^\d$/, "Enter a valid number"),
    code6:
      inputCount === 6
        ? Yup.string()
            .required("Required")
            .matches(/^\d$/, "Enter a valid number")
        : Yup.string().notRequired(),
  });

  const { handleSubmit, values, setFieldValue } = useFormik<FormValues>({
    initialValues: {
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",
    },
    onSubmit: handleVerifyPassword,
    validationSchema: validationSchema,
  });

  async function handleVerifyPassword() {
    setIsLoading(true);

    let verificationCode = "";
    for (let i = 1; i <= inputCount; i++) {
      verificationCode += values[`code${i}` as keyof FormValues];
    }

    try {
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode: verificationCode,
      });

      toast.success("Success", {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
        theme: "colored",
      });

      navigate("/updatePassword");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred", {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) {
      setFieldValue(`code${index + 1}` as keyof FormValues, value);
      if (value && index < inputCount - 1) {
        document.getElementById(`code${index + 2}`)?.focus();
      }
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !values[`code${index + 1}` as keyof FormValues] && index > 0) {
      document.getElementById(`code${index}`)?.focus();
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>, index: number) => {
    if (e.target.value === "" && index < inputCount - 1 && values[`code${index + 1}` as keyof FormValues]) {
      setFieldValue(`code${index + 1}` as keyof FormValues, "");
    }
  };

  const addInput = () => {
    if (inputCount < 6) {
      setInputCount(inputCount + 1);
    }
  };

  const removeInput = () => {
    if (inputCount > 5) {
      setFieldValue(`code${inputCount}` as keyof FormValues, "");
      setInputCount(inputCount - 1);
    }
  };

  return (
    <>
    <PageTitle title={'VerifyPassword'}/>
    <div className="min-h-screen flex items-center justify-center bg-[#111827]">
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto px-8 py-10 flex flex-col items-center mt-5">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-center gap-4">
            {Array.from({ length: 6 }).map(
              (_, index) =>
                index < inputCount && (
                  <input
                    key={index}
                    id={`code${index + 1}`}
                    name={`code${index + 1}`}
                    type="text"
                    maxLength={1}
                    value={values[`code${index + 1}` as keyof FormValues]}
                    onChange={(e) => handleInputChange(e, index)}
                    onBlur={(e) => handleInputBlur(e, index)}
                    onKeyDown={(e) => handleInputKeyDown(e, index)}
                    className="w-12 h-12 text-2xl text-center px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-100 dark:bg-gray-900 text-gray-950 dark:text-white"
                  />
                )
            )}
            {inputCount < 6 && (
              <button type="button" onClick={addInput} className="text-green-500 hover:text-green-600">
                +
              </button>
            )}
            {inputCount > 5 && (
              <button type="button" onClick={removeInput} className="text-red-500 hover:text-red-600">
                -
              </button>
            )}
          </div>

          <div className="flex gap-2 mt-4"></div>

          <button
            type="submit"
            className="bg-[#6028ff] text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500 mt-4"
            disabled={isLoading}
          >
            Verify
            {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
          </button>
          <Link
            to={"/forgetPassword"}
            className="text-center bg-[#6028ff] text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500 mt-4"
          >
            Back
          </Link>
        </form>
      </div>
    </div>
    </>
  );
}

