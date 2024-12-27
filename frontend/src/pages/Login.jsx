import { LogIn } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginSchema from "../schemas/loginSchema";
import { toast } from "react-toastify";
import userService from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedin } from "../redux/reducers/UserReducer";

const Login = () => {
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const [errors, seterrors] = useState({});
  let { isLoggedin } = useSelector((state) => state.user);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedin) {
      return navigate("/");
    }
    return navigate("/login");
  }, []);

  function handleLoginChange(e) {
    let { name, value } = e.target;
    setlogin((prev) => ({ ...prev, [name]: value }));

    try {
      loginSchema.pick({ [name]: true }).parse({ [name]: value });

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

  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      loginSchema.parse(login);
      await userService.userLogin({
        email: login.email,
        password: login.password,
      });
      toast.success("Login Success");
      dispatch(setLoggedin(true));
      navigate("/");
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

  return (
    <div className="w-full min-h-screen bg-[#111827] pt-10 pb-3 flex flex-col text-white items-center">
      <div>
        <LogIn className="h-12 w-12 text-indigo-500" />
      </div>
      <div className="mt-5">
        <h1 className="text-3xl font-bold">Login Your Account</h1>
      </div>
      <form onSubmit={handleLoginSubmit} className="mt-5">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="appearance-none relative block w-[400px] px-6 py-3 mt-2 mb-4 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Email"
            name="email"
            value={login.email}
            onChange={handleLoginChange}
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
            value={login.password}
            onChange={handleLoginChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
        >
          Login Account
        </button>

        <p className="text-center text-sm mt-3 text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-500 hover:text-indigo-400"
          >
            Sign up
          </Link>
          <div>
            <Link to={'/forgot-password'} className="text-indigo-500">Forgot Password</Link>
          </div>
        </p>
      </form>
    </div>
  );
};

export default Login;
