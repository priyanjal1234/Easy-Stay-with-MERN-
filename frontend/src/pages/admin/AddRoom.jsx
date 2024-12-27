import React, { useRef, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import roomService from "../../services/RoomService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const [roomData, setroomData] = useState({
    roomName: "",
    roomType: "",
    description: "",
    pricePerNight: "",
    maxGuests: "",
    availability: {
      from: null,
      to: null,
    },
    facilities: "",
  });

  const [image, setimage] = useState();

  let navigate = useNavigate()

  let imageRef = useRef(null);

  function handleRoomChange(e) {
    let { name, value } = e.target;
    setroomData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAvailabilityChange(field, date) {
    setroomData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [field]: date,
      },
    }));
  }

  async function handleCreateRoom(e) {
    e.preventDefault();

    const {
      roomName,
      roomType,
      description,
      pricePerNight,
      maxGuests,
      facilities,
      availability,
    } = roomData;

    const formData = new FormData();
    formData.append("roomName", roomName);
    formData.append("roomType", roomType);
    formData.append("description", description);
    formData.append("pricePerNight", pricePerNight);
    formData.append("maxGuests", maxGuests);
    formData.append("facilities", facilities);
    formData.append("availabilityFrom", availability.from.toISOString());
    formData.append("availabilityTo", availability.to.toISOString());
    formData.append("image", image);

    try {
      let createRoomRes = await roomService.createRoom(formData);
      toast.success("Room Created Successfully")
      navigate("/")
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#111827] text-white">
      <AdminSidebar />
      <div className="w-[80%] ml-[20%] min-h-screen flex flex-col items-center pt-6 pb-5  text-white">
        <div>
          <h1 className="text-3xl font-bold">Room Management</h1>
          <p className="text-gray-400 text-center mt-2">Add rooms</p>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mt-8">
          <form onSubmit={handleCreateRoom}>
            <div className="mb-3">
              <label
                className="block text-sm font-medium text-gray-200 mb-1"
                htmlFor="roomName"
              >
                Room Name
              </label>
              <input
                className="w-[400px] px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-500"
                type="text"
                placeholder="Enter Room Name"
                name="roomName"
                value={roomData.roomName}
                onChange={handleRoomChange}
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-sm font-medium text-gray-200 mb-1"
                htmlFor="roomType"
              >
                Room Type
              </label>
              <input
                className="w-[400px] px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-500"
                type="text"
                placeholder="Enter Room Type"
                name="roomType"
                value={roomData.roomType}
                onChange={handleRoomChange}
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-sm font-medium text-gray-200 mb-1"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="w-[400px] px-4 py-2 resize-none bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-500"
                type="text"
                placeholder="Enter Room Description"
                name="description"
                value={roomData.description}
                onChange={handleRoomChange}
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-sm font-medium text-gray-200 mb-1"
                htmlFor="pricePerNight"
              >
                Price Per Night
              </label>
              <input
                className="w-[400px] px-4 py-2  bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-500"
                type="number"
                placeholder="Enter Price Per Night"
                name="pricePerNight"
                value={roomData.pricePerNight}
                onChange={handleRoomChange}
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-sm font-medium text-gray-200 mb-1"
                htmlFor="maxGuests"
              >
                Max Guests
              </label>
              <input
                className="w-[400px] px-4 py-2  bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-500"
                type="number"
                placeholder="Enter Maximum Guests"
                name="maxGuests"
                value={roomData.maxGuests}
                onChange={handleRoomChange}
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-sm font-medium text-gray-200 mb-1"
                htmlFor="facilities"
              >
                Facilities
              </label>
              <input
                className="w-[400px] px-4 py-2  bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-500"
                type="text"
                placeholder="Enter Facilities"
                name="facilities"
                value={roomData.facilities}
                onChange={handleRoomChange}
              />
            </div>
            <div>
              <label className="mb-3 block" htmlFor="availability">
                Availability
              </label>
              <div>
                <label
                  className="block text-sm font-medium text-gray-200 mb-1"
                  htmlFor="from"
                >
                  From
                </label>
                <DatePicker
                  selected={roomData.availability.from}
                  className="bg-gray-800 border mb-3 px-4 py-2 rounded-sm border-gray-700"
                  placeholderText="yyyy-MM-dd"
                  dateFormat="yyyy-MM-dd"
                  onChange={(date) => handleAvailabilityChange("from", date)}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-200 mb-1"
                  htmlFor="from"
                >
                  To
                </label>
                <DatePicker
                  selected={roomData.availability.to}
                  className="bg-gray-800 mb-3 border px-4 py-2 rounded-sm border-gray-700"
                  placeholderText="yyyy-MM-dd"
                  dateFormat="yyyy-MM-dd"
                  onChange={(date) => handleAvailabilityChange("to", date)}
                />
              </div>
            </div>
            <div>
              <input
                onChange={(e) => setimage(e.target.files[0])}
                type="file"
                className="hidden"
                ref={imageRef}
              />
              <div
                onClick={() => imageRef.current.click()}
                className="px-3 py-2 bg-blue-600 rounded-lg w-fit cursor-pointer"
              >
                Upload Image
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 mt-3 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Add Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
