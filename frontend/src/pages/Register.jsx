import React, { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../services/UserService";
import registerSchema from "../schemas/registerSchema";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedin, setUser } from "../redux/reducers/UserReducer";

const Register = () => {
  const [register, setregister] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });

  const [errors, seterrors] = useState({});
  let { isLoggedin } = useSelector((state) => state.user);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedin) {
      return navigate("/");
    }
    return navigate("/register");
  }, []);

  function handleRegisterChange(e) {
    let { name, value } = e.target;
    setregister((prev) => ({ ...prev, [name]: value }));

    try {
      registerSchema.pick({ [name]: true }).parse({ [name]: value });
      seterrors((prev) => ({ ...prev, [name]: null }));
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

  async function handleRegisterSubmit(e) {
    e.preventDefault();

    try {
      registerSchema.parse(register);
      await userService.userSignUp({
        name: register.name,
        email: register.email,
        password: register.password,
        address: register.address,
        phoneNumber: register.phoneNumber,
      });
      toast.success("Check Your Email For Verification");
      navigate("/verify-email");
      seterrors({});
    } catch (error) {
      if (error.errors) {
        let fieldErrors = error.errors.reduce((acc, { path, message }) => {
          acc[path[0]] = message;
          return acc;
        }, {});

        seterrors(fieldErrors);
      } else {
        toast.error(
          error?.response?.data?.message || error?.response?.data?.errorMessage
        );
      }
    }
  }

  async function handleGoogleLogin() {
    try {
      window.location.href = "http://localhost:3000/api/users/auth/google";
      
      dispatch(setLoggedin(true));
      navigate("/");
    } catch (error) {
      toast.error("Login Failed");
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#111827] pt-3 pb-3 flex flex-col text-white items-center">
      <div>
        <Building2 className="h-12 w-12 text-indigo-500" />
      </div>
      <div className="mt-5">
        <h1 className="text-3xl font-bold">Create Your Account</h1>
        <h2 className="text-center text-zinc-500">Join Easy Stay Today</h2>
      </div>
      <form onSubmit={handleRegisterSubmit} className="mt-5">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="appearance-none relative block w-[400px] px-6 py-3 mt-2 mb-4 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Name"
            name="name"
            value={register.name}
            onChange={handleRegisterChange}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="appearance-none relative block w-[400px] px-6 py-3 mt-2 mb-4 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Email"
            name="email"
            value={register.email}
            onChange={handleRegisterChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="appearance-none relative block w-[400px] px-6 py-3 mt-2 mb-4 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Password"
            name="password"
            value={register.password}
            onChange={handleRegisterChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="appearance-none relative block w-[400px] px-6 py-3 mt-2 mb-4 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Address"
            name="address"
            value={register.address}
            onChange={handleRegisterChange}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="number"
            className="appearance-none relative block w-[400px] px-6 py-3 mt-2 mb-4 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Phone Number"
            name="phoneNumber"
            value={register.phoneNumber}
            onChange={handleRegisterChange}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
        >
          Create Account
        </button>

        <p className="text-center text-sm mt-3 text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-500 hover:text-indigo-400"
          >
            Sign in
          </Link>
        </p>
        {/* <div
          onClick={handleGoogleLogin}
          className="w-[400px] h-[45px] cursor-pointer hover:bg-zinc-800 flex items-center justify-center gap-3 border-2 border-zinc-700 rounded-full mt-3"
        >
          <div className="w-[25px] h-[25px]  overflow-hidden rounded-full">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWg7X0YYzUCU5m8BA_sH_ti92q4X0lCz5h_w&s"
              alt=""
            />
          </div>
          <span>Continue with Google</span>
        </div> */}
      </form>
    </div>
  );
};

export default Register;
