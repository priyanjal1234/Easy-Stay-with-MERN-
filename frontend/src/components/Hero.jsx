import React, { useState, useMemo } from "react";
import { Search, Users } from "lucide-react";
import { useSelector } from "react-redux";
import RoomCard from "./RoomCard";

const Hero = () => {
  // Get the full list of rooms from Redux
  const { allRooms } = useSelector((state) => state.room);
  
  // Local state for search query and guest filter.
  const [searchQuery, setSearchQuery] = useState("");
  const [guestFilter, setGuestFilter] = useState(""); // Empty means no guest filter

  // Filter rooms based on room name and guest capacity
  const filteredRooms = useMemo(() => {
    let rooms = allRooms;

    // Filter by search query if provided
    if (searchQuery.trim()) {
      rooms = rooms.filter((room) =>
        room?.roomName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by guest capacity if selected
    if (guestFilter) {
      if (guestFilter === "4+ Guests") {
        // For "4+ Guests", filter rooms that can accommodate 4 or more guests.
        rooms = rooms.filter((room) => room.capacity >= 4);
      } else {
        // For "1 Guest", "2 Guests", etc. extract the number and filter.
        const guestCount = parseInt(guestFilter, 10);
        rooms = rooms.filter((room) => room.capacity >= guestCount);
      }
    }

    return rooms;
  }, [searchQuery, guestFilter, allRooms]);

  return (
    <div className="hero px-5 py-8">
      <div>
        <h1 className="text-4xl font-bold text-center">
          Find Your Perfect Stay
        </h1>
        <p className="text-xl text-gray-500 text-center mt-3">
          Book comfortable rooms at the best prices
        </p>
      </div>

      {/* Integrated search UI */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search rooms..."
                className="w-full pl-10 pr-4 py-2 rounded-lg outline-none bg-gray-700 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 rounded-lg outline-none bg-gray-700"
                value={guestFilter}
                onChange={(e) => setGuestFilter(e.target.value)}
              >
                <option value="">Any Guests</option>
                <option value="1 Guest">1 Guest</option>
                <option value="2 Guests">2 Guests</option>
                <option value="3 Guests">3 Guests</option>
                <option value="4+ Guests">4+ Guests</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Render room cards from filteredRooms */}
      <div className="flex gap-5 flex-wrap">
        {filteredRooms?.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Hero;
