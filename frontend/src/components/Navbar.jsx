import React from "react";
import { Hotel, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  let { isLoggedin, user } = useSelector((state) => state.user);
  return (
    <div className="w-full h-[80px] bg-[#1F2937] flex items-center px-5 justify-between">
      <div className="flex items-center">
        <Hotel className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
        <span className="ml-2 text-2xl font-semibold text-gray-800 dark:text-white">
          Easy <span className="text-red-500">Stay</span>
        </span>
      </div>
      {isLoggedin ? (
        <div className="flex items-center gap-2">
          <Link
            to={"/profile"}
            className="w-[40px] h-[40px] flex items-center justify-center bg-orange-600 rounded-full text-xl"
          >
            {user?.name?.split("")[0]}
          </Link>
          {
            user?.isAdmin && <Link className="px-3 py-2 bg-indigo-600 rounded-lg" to={'/admin-panel'}>Admin Panel</Link>
          }
        </div>
      ) : (
        <div className="flex gap-3">
          <Link
            to="/login"
            className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <LogIn className="h-5 w-5 mr-1" />
            <span>Login</span>
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
