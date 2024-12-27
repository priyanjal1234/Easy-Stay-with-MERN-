import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import userService from "../services/UserService";
import { toast } from "react-toastify";
import { setLoggedin, setUser } from "../redux/reducers/UserReducer";

const Profile = () => {
  let { user } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  async function handleLogout() {
    try {
      await userService.userLogout();
      toast.success("Logout Success");
      dispatch(setLoggedin(false));
      dispatch(setUser(null))
      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  return (
    <div className="w-full h-screen bg-[#111827] text-white p-10">
      <div className="w-full flex justify-between">
        <h1 className="text-3xl font-semibold mb-4">Hello, {user?.name}</h1>
        <span onClick={handleLogout} className="text-red-600 cursor-pointer">
          Logout
        </span>
        <Link to={"/"} className="text-purple-600">
          Go to home
        </Link>
      </div>
      <h2 className="text-lg mb-2">Name: {user?.name}</h2>
      <div className="flex items-center gap-3">
        <h2 className="text-lg mb-2">Email: {user?.email} </h2>
        {user?.isVerified && (
          <div className="w-5 h-5 bg-green-500 text-white">
            <Check size={20} />
          </div>
        )}
      </div>
      {user?.address && (
        <h2 className="text-lg mb-2">Address: {user?.address}</h2>
      )}
      {user?.phoneNumber && (
        <h2 className="text-lg mb-2">Phone Number: {user?.phoneNumber}</h2>
      )}
      {!user?.address && !user?.phoneNumber ? (
        <Link
          className="px-3 py-2 bg-purple-600 rounded-lg"
          to={"/edit-profile"}
        >
          Complete Your Profile
        </Link>
      ) : (
        <Link
          className="px-3 py-2 mt-5 block w-fit  bg-purple-600 rounded-lg"
          to={"/edit-profile"}
        >
          Edit Profile
        </Link>
      )}
    </div>
  );
};

export default Profile;
