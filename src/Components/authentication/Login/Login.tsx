import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../Context/AuthContext";
import { ImSpinner9 } from "react-icons/im";
import PageTitle from "../../PageTitle/PageTitle";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { setUserToken } = useAuth();
  const navigate = useNavigate();
  const { handleSubmit, values, handleChange, errors, handleBlur, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: Login,
      validationSchema: Yup.object({
        email: Yup.string()
          .required("Email is required")
          .email("Enter a valid email"),
        password: Yup.string()
          .required("Password is required")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            "Password must be at least 8 characters long and include letters and numbers"
          ),
      }),
    });

  async function Login() {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(({ data }) => {
        setIsLoading(false);
        setSuccessMessage(data.message);
        setUserToken(data.token);
        localStorage.setItem("token", data.token);
        navigate("/tmdb-auth");
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(error.response.data.message);
      });
  }

  return (
    <>
      <PageTitle title={"Login"} />
      <section className="py-10 bg-[#111827]">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold text-center text-white">
            Welcome Back
          </h1>
          <p className="mt-2 text-xl text-center text-gray-200">
            We are <span className="text-[#6028ff]">Happy</span> to see you back
          </p>
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-1/2 mx-auto text-center py-5"
          >
            <label
              htmlFor="email"
              className="block text-start mb-2 text-sm text-gray-200"
            >
              E-Mail Address
            </label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              className="w-full mb-5 px-4 py-2 rounded-lg bg-gray-900 text-gray-300 border-gray-600 border focus:border-primary focus:border-primary focus:outline-none focus:ring focus:ring-primary placeholder-gray-400 focus:ring-opacity-20"
              name="email"
            />
            {touched.email && errors.email && (
              <p className="text-rose-500 text-start mb-4 -mt-3">
                {errors.email}
              </p>
            )}

            <label
              htmlFor="password"
              className="block text-start mb-2 text-sm text-gray-200"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              className="w-full mb-5 px-4 py-2 rounded-lg bg-gray-900 text-gray-300 border-gray-600 border focus:border-primary focus:border-primary focus:outline-none focus:ring focus:ring-primary placeholder-gray-400 focus:ring-opacity-20"
              name="password"
            />
            {touched.password && errors.password && (
              <p className="text-rose-500 text-start mb-4 -mt-3">
                {errors.password}
              </p>
            )}
            <div className="flex items-center justify-between mb-5">
              <div>
                <input
                  type="checkbox"
                  name="rememberMe"
                  className=" rounded shadow-sm text-primary bg-gray-900 text-gray-300 border-gray-600 focus:border-primary focus:outline-none focus:ring focus:ring-primary placeholder-gray-400 focus:ring-opacity-20"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-200">
                  Remember Me
                </label>
              </div>
              <Link to={"/forgetPassword"}>
                <span className="text-xs uppercase text-gray-400 hover:underline">
                  Forgot Your Password?
                </span>
              </Link>
            </div>

            <button
              className="w-full text-white bg-[#6028ff] p-2 rounded-md disabled:bg-gray-500"
              disabled={isLoading}
            >
              Sign in{" "}
              {isLoading && (
                <ImSpinner9 className="inline-block animate-spin ml-2" />
              )}
            </button>

            {errorMessage && (
              <p className="text-red-500 text-center mt-4">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-center mt-4">
                {successMessage}
              </p>
            )}
            <div className="mt-5 flex items-center gap-x-2 justify-center">
              <span className="block bg-gray-600 h-[2px] w-[5rem]"></span>
              <Link to={"/register"}>
                <span className="text-xs uppercase text-gray-400 hover:underline">
                  Create an account
                </span>
              </Link>
              <span className="block bg-gray-600 h-[2px] w-[5rem]"></span>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
