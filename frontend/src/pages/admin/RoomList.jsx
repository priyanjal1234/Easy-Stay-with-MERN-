import React from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import roomService from "../../services/RoomService";
import { toast } from "react-toastify";

const RoomList = () => {
  let { allRooms } = useSelector((state) => state.room); // Assuming `allRooms` is an array of room objects

  async function handleDeleteRoom(id) {
    try {
      await roomService.deleteRoom(id)
      toast.success("Deleted Successfully")
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      )
    }
  }

  return (
    <div className="w-full h-screen text-white bg-[#111827]">
      <AdminSidebar />

      <div className="ml-[20%] p-5">
        <h1 className="text-center text-3xl font-semibold mb-6">Room List</h1>
        <div className="bg-gray-800 rounded-lg overflow-hidden w-[80%] mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Room Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Room Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Price Per Night
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Max Guests
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {allRooms?.length > 0 ? (
                  allRooms.map((room) => (
                    <tr key={room.id} className="hover:bg-gray-750">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {room?.roomName || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {room?.roomType || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          Rs. {room?.pricePerNight || "0"}  / night
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {room?.maxGuests || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-3">
                          <button onClick={() => handleDeleteRoom(room?._id)} className="text-red-400 hover:text-red-300">
                            <span>Delete</span>
                          </button>
                          <button className="text-gray-400 hover:text-gray-300">
                            <span>More</span>
                          </button>
                          <button className="text-blue-400 hover:text-blue-300">
                            <span>Edit</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-sm text-gray-400"
                    >
                      No rooms available to display.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomList;
