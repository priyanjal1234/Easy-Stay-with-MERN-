import React, { useState } from "react";
import userService from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setemail] = useState("");
  let navigate = useNavigate();

  async function handleForgotPassword(e) {
    e.preventDefault();

    try {
      await userService.forgotPassword(email);
      toast.success("Check Your Email For Link");
      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  return (
    <div className="w-full h-screen bg-[#111827] text-white p-10">
      <h1 className="text-3xl font-semibold mb-4">Forgot Password</h1>
      <form onSubmit={handleForgotPassword}>
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="Email"
          type="email"
          className="px-3 py-2 bg-zinc-700 outline-none"
        />
        <button
          className="px-3 py-2 ml-4 bg-indigo-600 rounded-lg"
          type="submit"
        >
          Get Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
