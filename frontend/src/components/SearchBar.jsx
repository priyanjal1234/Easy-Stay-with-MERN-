import React, { useState } from "react";
import { Search, Users } from "lucide-react";
import { setAllRooms } from "../redux/reducers/RoomReducer.js";
import { useDispatch } from "react-redux";

export default function SearchBar({ allRooms }) {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      dispatch(setAllRooms(allRooms)); // Reset to all rooms when search is empty
    } else {
      const filteredRooms = allRooms?.filter((room) =>
        room?.roomName?.toLowerCase().startsWith(query.toLowerCase())
      );
      dispatch(setAllRooms(filteredRooms));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search rooms..."
              className="w-full pl-10 pr-4 py-2 rounded-lg 
                outline-none
                bg-gray-700   
                placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="relative">
            <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2 rounded-lg 
              outline-none
              bg-gray-700"
            >
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4+ Guests</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
