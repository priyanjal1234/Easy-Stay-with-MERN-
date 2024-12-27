import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userService from "../services/UserService";
import { toast } from "react-toastify";

const ResetPassword = () => {
  let { token } = useParams();
  const [password, setpassword] = useState("");
  let navigate = useNavigate();

  
  async function handleResetPassword(e) {
    e.preventDefault()
    try {
      await userService.resetPassword(token, password);
      toast.success("Password Reset Successfully");
      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  return (
    <div className="w-full h-screen bg-[#111827] text-white p-10">
      <h1 className="text-3xl font-semibold mb-4">Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <input
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter Password"
          type="password"
          className="px-3 py-2 bg-zinc-700 outline-none"
        />
        <button
          className="px-3 py-2 ml-4 bg-indigo-600 rounded-lg"
          type="submit"
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
