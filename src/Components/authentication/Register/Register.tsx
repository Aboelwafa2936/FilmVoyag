import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import PageTitle from "../../PageTitle/PageTitle";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const { handleSubmit, handleBlur, touched, handleChange, errors, values } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        phone: "",
        password: "",
        rePassword: "",
      },
      onSubmit: register,
      validationSchema: Yup.object({
        name: Yup.string()
          .required("Name is required")
          .min(3, "Name must be more than 2 characters")
          .max(20, "Name must be less than 20 characters"),
        email: Yup.string()
          .required("Email is required")
          .email("Enter a valid email"),
        phone: Yup.string()
          .required("Phone number is required")
          .matches(
            /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
            "Enter a valid phone number"
          ),
        password: Yup.string()
          .required("Password is required")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            "Password must be at least 8 characters long and include letters and numbers"
          ),
        rePassword: Yup.string()
          .required("Confirm password is required")
          .oneOf([Yup.ref("password")], "Passwords must match"),
      }),
    });

  async function register() {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      setIsLoading(false);
      setSuccessMessage(data.message);
      setErrorMessage("");
      navigate("/login");
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      setSuccessMessage("");
    }
  }

  return (
    <>
      <PageTitle title={"Register"} />
      <section className="py-10 bg-[#111827]">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold text-center text-white">
            Welcome
          </h1>
          <p className="mt-2 text-xl text-center text-gray-200">
            Join <span className="text-[#6028ff]">FilmVoyag</span> community
          </p>
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-1/2 mx-auto text-center py-5"
          >
            <label
              htmlFor="name"
              className="block text-start mb-2 text-sm text-gray-200"
            >
              Name
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.name}
              className="w-full mb-5 px-4 py-2 rounded-lg bg-gray-900 text-gray-300 border-gray-600 border focus:border-primary focus:outline-none focus:ring focus:ring-primary placeholder-gray-400 focus:ring-opacity-20"
              name="name"
            />
            {touched.name && errors.name && (
              <p className="text-rose-500 text-start mb-4 -mt-3">
                {errors.name}
              </p>
            )}

            <label
              htmlFor="email"
              className="block text-start mb-2 text-sm text-gray-200"
            >
              E-Mail Address
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
              className="w-full mb-5 px-4 py-2 rounded-lg bg-gray-900 text-gray-300 border-gray-600 border focus:border-primary focus:outline-none focus:ring focus:ring-primary placeholder-gray-400 focus:ring-opacity-20"
              name="email"
            />
            {touched.email && errors.email && (
              <p className="text-rose-500 text-start mb-4 -mt-3">
                {errors.email}
              </p>
            )}

            <label
              htmlFor="phone"
              className="block text-start mb-2 text-sm text-gray-200"
            >
              Phone
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="tel"
              value={values.phone}
              className="w-full mb-5 px-4 py-2 rounded-lg bg-gray-900 text-gray-300 border-gray-600 border focus:border-primary focus:outline-none focus:ring focus:ring-primary placeholder-gray-400 focus:ring-opacity-20"
              name="phone"
            />
            {touched.phone && errors.phone && (
              <p className="text-rose-500 text-start mb-4 -mt-3">
                {errors.phone}
              </p>
            )}

            <label
              htmlFor="password"
              className="block text-start mb-2 text-sm text-gray-200"
            >
              Password
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              className="w-full mb-5 px-4 py-2 rounded-lg bg-gray-900 text-gray-300 border-gray-600 border focus:border-primary focus:outline-none focus:ring focus:ring-primary placeholder-gray-400 focus:ring-opacity-20"
              name="password"
            />
            {touched.password && errors.password && (
              <p className="text-rose-500 text-start mb-4 -mt-3">
                {errors.password}
              </p>
            )}

            <label
              htmlFor="rePassword"
              className="block text-start mb-2 text-sm text-gray-200"
            >
              Confirm Password
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.rePassword}
              className="w-full mb-5 px-4 py-2 rounded-lg bg-gray-900 text-gray-300 border-gray-600 border focus:border-primary focus:outline-none focus:ring focus:ring-primary placeholder-gray-400 focus:ring-opacity-20"
              name="rePassword"
            />
            {touched.rePassword && errors.rePassword && (
              <p className="text-rose-500 text-start mb-4 -mt-3">
                {errors.rePassword}
              </p>
            )}

            <button
              className="w-full text-white bg-[#6028ff] p-2 rounded-md disabled:bg-gray-500"
              disabled={isLoading}
            >
              Register{" "}
              {isLoading && (
                <ImSpinner9 className="inline-block animate-spin ml-2" />
              )}
            </button>

            {errorMessage && (
              <p className="text-red-500 text-center mt-4">
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className="text-green-500 text-center mt-4">
                {successMessage}
              </p>
            )}

            <div className="mt-5 flex items-center gap-x-2 justify-center">
              <span className="block bg-gray-600 h-[2px] w-[5rem]"></span>
              <Link to={"/login"}>
                <span className="text-xs uppercase text-gray-400 hover:underline">
                  Do you have an account?
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


