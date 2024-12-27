import React, { useState } from "react";
import userService from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [edit, setedit] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });

  let navigate = useNavigate();

  function handleEditChange(e) {
    let { name, value } = e.target;
    setedit((prev) => ({ ...prev, [name]: value }));
  }

  async function handleEditProfile(e) {
    e.preventDefault();
    try {
      await userService.editProfile(edit);
      toast.success("Profile is updated successfully");
      navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  return (
    <div className="w-full h-screen bg-[#111827] p-10 text-white">
      <h1 className="text-3xl font-semibold mb-5">Edit Profile</h1>
      <form onSubmit={handleEditProfile}>
        <div>
          <label htmlFor="name">New Name</label>
          <input
            className="px-3 py-2 bg-zinc-700 block mt-3 outline-none"
            type="text"
            placeholder="New Name"
            name="name"
            value={edit.name}
            onChange={handleEditChange}
          />
        </div>
        <div>
          <label htmlFor="address">New Address</label>
          <input
            className="px-3 py-2 bg-zinc-700 block mt-3 outline-none"
            type="text"
            placeholder="New Address"
            name="address"
            value={edit.address}
            onChange={handleEditChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">New Phone Number</label>
          <input
            className="px-3 py-2 bg-zinc-700 block mt-3 outline-none"
            type="number"
            placeholder="New Number"
            name="phoneNumber"
            value={edit.phoneNumber}
            onChange={handleEditChange}
          />
        </div>
        <button className="px-3 py-2 bg-blue-600 rounded-lg mt-4" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
