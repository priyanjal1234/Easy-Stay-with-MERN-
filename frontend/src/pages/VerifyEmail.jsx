import React, { useState } from "react";
import verifyEmailSchema from "../schemas/verifyEmailSchema";
import userService from "../services/UserService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoggedin } from "../redux/reducers/UserReducer";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const [verifyEmail, setverifyEmail] = useState({
    email: "",
    verificationCode: "",
  });
  const [errors, seterrors] = useState({});

  function handleVerifyEmailChange(e) {
    let { name, value } = e.target;
    setverifyEmail((prev) => ({ ...prev, [name]: value }));

    try {
      verifyEmailSchema.pick({ [name]: true }).parse({ [name]: value });
      seterrors({});
    } catch (error) {
      if (error.errors) {
        let fieldErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        seterrors(fieldErrors);
      }
    }
  }

  async function handleVerifyEmailSubmit(e) {
    e.preventDefault();

    try {
      verifyEmailSchema.parse(verifyEmail);

      await userService.verifyUserEmail({
        email: verifyEmail.email,
        verificationCode: verifyEmail.verificationCode,
      });
      toast.success("Email Verified Successfully")
      dispatch(setLoggedin(true))
      navigate("/")

    } catch (error) {
      if (error.errors) {
        const fieldErrors = error.errors.reduce((acc, { path, message }) => {
          acc[path[0]] = message;
          return acc;
        }, {});

        seterrors(fieldErrors);
      }
      else {
        toast.error(
          error?.response?.data?.message || error?.response?.data?.errorMessage
        )
      }
    }
  }

  return (
    <div className="w-full h-screen bg-[#111827] flex flex-col justify-center items-center text-white">
      <h1 className="text-3xl font-bold mb-4">Verify Email</h1>
      <p className="mt-2 text-sm text-center text-gray-400 mb-4">
        We've sent a verification code to your email address. <br /> Please
        enter it below to complete your registration.
      </p>
      <form onSubmit={handleVerifyEmailSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="appearance-none relative block w-[400px] px-6 py-3 mt-2 mb-4 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Email"
            name="email"
            value={verifyEmail.email}
            onChange={handleVerifyEmailChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="verificationCode">Verification Code</label>
          <input
            type="number"
            className="appearance-none relative block w-[400px] px-6 py-3 mt-2 mb-4 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Verification Code"
            name="verificationCode"
            value={verifyEmail.verificationCode}
            onChange={handleVerifyEmailChange}
          />
          {errors.verificationCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.verificationCode}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
